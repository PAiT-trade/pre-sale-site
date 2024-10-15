declare module "react-signature-canvas" {
  import { Component } from "react";

  export interface SignatureCanvasProps {
    penColor?: string;
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    onEnd?: () => void;
    onBegin?: () => void;
    ref: HTMLCanvasElement | null;
  }

  export default class SignatureCanvas extends Component<SignatureCanvasProps> {
    clear: () => void;
    toDataURL: (imageType?: string, quality?: number) => string;
    fromDataURL: (data: string) => void;
  }
}
