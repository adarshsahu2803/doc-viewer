import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";


// eslint-disable-next-line react/prop-types
export const PDFRenderer = ({fileUrl}) => {
    const newplugin = defaultLayoutPlugin()
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {
            fileUrl && <Viewer fileUrl={fileUrl} plugins={[newplugin]} />
        }
      </Worker>
    )
}

export default PDFRenderer
