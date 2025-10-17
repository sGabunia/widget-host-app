import { useScript } from "./use-script"

function App() {
  const status = useScript("https://chat.nebi.dev/v2/injector/", {
    "data-brand-id": "10"
  })
  return (
    <div>
      Script status: {status}
    </div>
  )
}

export default App
