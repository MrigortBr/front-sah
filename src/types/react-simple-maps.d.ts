declare module "react-simple-maps" {
    import type { CSSProperties, MouseEvent, ReactNode } from "react";

    export interface ProjectionConfig {
        center?: [number, number];
        scale?: number;
        rotate?: [number, number, number];
        parallels?: [number, number];
    }

    export interface ComposableMapProps {
        projection?: string;
        projectionConfig?: ProjectionConfig;
        width?: number;
        height?: number;
        style?: CSSProperties;
        children?: ReactNode;
    }

    export interface GeoFeature {
        rsmKey: string;
        properties: Record<string, string | number | null | undefined>;
        geometry: unknown;
        type: string;
    }

    export interface GeographiesRenderProps {
        geographies: GeoFeature[];
    }

    export interface GeographiesProps {
        geography: string | object;
        children: (props: GeographiesRenderProps) => ReactNode;
    }

    export interface GeographyStyleEntry {
        outline?: string;
        fill?: string;
        stroke?: string;
        opacity?: number;
        cursor?: string;
    }

    export interface GeographyProps {
        geography: GeoFeature | object;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        style?: {
            default?: GeographyStyleEntry;
            hover?: GeographyStyleEntry;
            pressed?: GeographyStyleEntry;
        };
        onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void;
        onMouseMove?: (event: MouseEvent<SVGPathElement>) => void;
        onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void;
        onClick?: (event: MouseEvent<SVGPathElement>) => void;
    }

    export interface ZoomableGroupProps {
        center?: [number, number];
        zoom?: number;
        children?: ReactNode;
    }

    export function ComposableMap(props: ComposableMapProps): JSX.Element;
    export function Geographies(props: GeographiesProps): JSX.Element;
    export function Geography(props: GeographyProps): JSX.Element;
    export function ZoomableGroup(props: ZoomableGroupProps): JSX.Element;
}
