import { useScript } from "./use-script"

function App() {
  const status = useScript("https://chat.nebi.live/v2/injector/", {
    "data-brand-id": "10",
    "data-host": "live"
  })

  const handleHide = () => {
    window.postMessage({ command: 'hide' }, '*');
  };

  const handleShow = () => {
    window.postMessage({ command: 'show' }, '*');
  };

  const handleToggle = () => {
    window.postMessage({ command: 'toggle' }, '*');
  };

  const handleLogin = () => {
    window.postMessage({ command: 'send-data', data: { username: 'test123456', language: 'it', ID: 390 } }, '*');
  };

  const handleChangeLang = () => {
    window.postMessage({ command: 'current-lang', data: { currentLang: 'fr' } }, '*');
  };

  const handlePop = () => {
    // Add your pop message logic here
  };

  return (
    <div>
      Script status: {status}
      <p>Widget example page</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" id="hide" onClick={handleHide}>
          Hide
        </button>
        <button type="button" id="show" onClick={handleShow}>
          Show
        </button>
        <button type="button" id="toggle" onClick={handleToggle}>
          Toggle
        </button>
        <button type="button" id="login" onClick={handleLogin}>
          Mock Log in(new version)
        </button>
        <button type="button" id="change-lang" onClick={handleChangeLang}>
          Mock Change language(new version)
        </button>
        <button type="button" id="pop" onClick={handlePop}>
          Pop message
        </button>
      </div>
    </div>
  )
}

export default App
