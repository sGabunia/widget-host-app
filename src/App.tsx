import { useScript } from "./use-script"

function App() {
  const status = useScript("https://chat.nebi.live/v2/injector/", {
    "data-brand-id": "10",
    "data-host": "live"
  })
  return (
    <div>
      Script status: {status}
    </div>
  )
}

export default App
