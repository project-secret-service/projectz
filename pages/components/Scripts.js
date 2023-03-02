import Script from "next/script"
export default function Scripts() {
    return (
        <>
            <Script strategy="afterInteractive" src="/assets/vendor/apexcharts/apexcharts.min.js"></Script>
            <Script strategy="afterInteractive" src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
            <Script strategy="afterInteractive" src="/assets/vendor/chart.js/chart.umd.js"></Script>
            <Script strategy="afterInteractive" src="/assets/vendor/echarts/echarts.min.js"></Script>
            <Script strategy="afterInteractive" src="/assets/vendor/quill/quill.min.js"></Script>
            <Script strategy="afterInteractive" src="/assets/vendor/simple-datatables/simple-datatables.js"></Script>
            <Script strategy="afterInteractive" src="/assets/vendor/tinymce/tinymce.min.js"></Script>
            <Script strategy="afterInteractive" src="/assets/vendor/php-email-form/validate.js"></Script>
        </>
    )
}
