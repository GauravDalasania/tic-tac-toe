import { AriaAttributes, DOMAttributes } from "react";

declare module "react" {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		// extends React's HTMLAttributes
		row?: number;
		col?: number;
	}
}
