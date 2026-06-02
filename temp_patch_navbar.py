from pathlib import Path
p=Path('frontend/src/components/Navbar.jsx')
s=p.read_text()
old_start="useEffect(() => {"
start_idx = s.find(old_start)
if start_idx==-1:
    print('start not found')
    raise SystemExit(1)
end_marker="}, []);"
end_idx = s.find(end_marker, start_idx)
if end_idx==-1:
    print('end not found')
    raise SystemExit(1)
end_idx += len(end_marker)
new_block = '''useEffect(() => {
    setUsername(getUsernameFromToken());

    # update username when authentication changes (login/logout)
    onAuthChanged = lambda: setUsername(getUsernameFromToken())
    # attach listener in browser runtime
    try:
        window.addEventListener('authChanged', onAuthChanged)
    except Exception:
        pass

    # also listen to storage events (other tabs)
    def onStorage(e):
        try:
            if getattr(e, 'key', None) == 'token':
                setUsername(getUsernameFromToken())
        except Exception:
            pass
    try:
        window.addEventListener('storage', onStorage)
    except Exception:
        pass

    let_frame = None
    frame_var = 'frame_placeholder'
    # keep scroll handler intact
    frame = None
    def handleScroll():
        global frame
        if frame:
            return
        try:
            frame = window.requestAnimationFrame(lambda: (setIsScrolled(window.scrollY > 10), globals().__setitem__('frame', None)))
        except Exception:
            pass

    try:
        window.addEventListener('scroll', handleScroll, { 'passive': True })
    except Exception:
        pass

    return_value = '''
    window.removeEventListener('scroll', handleScroll)
    try:
        window.removeEventListener('authChanged', onAuthChanged)
    except Exception:
        pass
    try:
        window.removeEventListener('storage', onStorage)
    except Exception:
        pass
    if frame:
        try:
            window.cancelAnimationFrame(frame)
        except Exception:
            pass
  }, []);'''
# The above attempt at generating JS via Python is brittle; instead we'll use a fixed JS block below.
new_block = '''useEffect(() => {
    setUsername(getUsernameFromToken());

    // update username when authentication changes (login/logout)
    const onAuthChanged = () => setUsername(getUsernameFromToken());
    window.addEventListener('authChanged', onAuthChanged);

    // also listen to storage events (other tabs)
    const onStorage = (e) => {
      if (e.key === 'token') {
        setUsername(getUsernameFromToken());
      }
    };
    window.addEventListener('storage', onStorage);

    let frame = null;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        frame = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('authChanged', onAuthChanged);
      window.removeEventListener('storage', onStorage);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);'''

s = s[:start_idx] + new_block + s[end_idx:]
p.write_text(s)
print('patched')
