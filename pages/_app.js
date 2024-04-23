import '../styles/globals.css' // este archivo vive en src/styles.css
import Home from "./index.js"

export default function App({ props }) {
    return (
        <div>
            <section {...props} />
            <Home />
        </div>
    )
}