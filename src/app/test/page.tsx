"use client";
import { useEffect } from "react";
import { PagesWrapper } from "@/components/common/Common.styled";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function KYC() {
  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    const marginTopBottom = 10; // Margin in mm
    const pagePadding = 5; // Additional padding inside the PDF pages in mm
    const pdf = new jsPDF("p", "mm", "a4");
    const pageHeight =
      pdf.internal.pageSize.height - 2 * marginTopBottom - 2 * pagePadding;
    const pageWidth = pdf.internal.pageSize.width - 2 * pagePadding;
    let currentPosition = 0; // Tracks the current position for each page
    if (!input) return;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      const totalCanvasHeight = canvas.height;
      const totalPDFPages = Math.ceil(
        totalCanvasHeight / ((pageHeight * canvas.width) / pageWidth)
      );

      for (let i = 0; i < totalPDFPages; i++) {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = (pageHeight * canvas.width) / pageWidth;

        const pageCtx = pageCanvas.getContext("2d");

        if (!pageCtx) return;
        pageCtx.fillStyle = "white";
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Draw only the section that fits on this page
        pageCtx.drawImage(
          canvas,
          0,
          currentPosition,
          canvas.width,
          pageCanvas.height,
          0,
          0,
          canvas.width,
          pageCanvas.height
        );

        const pageData = pageCanvas.toDataURL("image/png");
        if (i > 0) pdf.addPage();
        pdf.addImage(
          pageData,
          "PNG",
          pagePadding,
          marginTopBottom + pagePadding,
          pageWidth,
          pageHeight
        );

        currentPosition += (pageHeight * canvas.width) / pageWidth; // Update position for the next page
      }

      pdf.save("download.pdf");
    });
  };
  return (
    <PagesWrapper>
      <div
        id="pdf-content"
        style={{ paddingTop: "30px", backgroundColor: "#fff", color: "#000" }}
      >
        <h1>My Content for PDF</h1>

        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index} style={{ margin: "10px" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            eaque voluptatibus odit placeat adipisci amet illum qui temporibus
            quidem dolorum, vero nesciunt debitis ullam id laudantium laboriosam
            et magnam veritatis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Inventore eaque voluptatibus odit placeat adipisci
            amet illum qui temporibus quidem dolorum, vero nesciunt debitis
            ullam id laudantium laboriosam et magnam veritatis. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Inventore eaque
            voluptatibus odit placeat adipisci amet illum qui temporibus quidem
            dolorum, vero nesciunt debitis ullam id laudantium laboriosam et
            magnam veritatis. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Inventore eaque voluptatibus odit placeat adipisci amet illum
            qui temporibus quidem dolorum, vero nesciunt debitis ullam id
            laudantium laboriosam et magnam veritatis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Inventore eaque voluptatibus odit
            placeat adipisci amet illum qui temporibus quidem dolorum, vero
            nesciunt debitis ullam id laudantium laboriosam et magnam veritatis.
          </p>
        ))}
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </PagesWrapper>
  );
}
