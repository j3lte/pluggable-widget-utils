// Because Mendix doesn't release this as part of their Pluggable Widget tools, I've copied it here.

/**
 * The StructurePreviewProps type is used to define the structure of the widget preview. The widget preview is used to visualize the widget in the Mendix Studio Pro and Studio. It can be used to render a custom image, a container, a row layout, text, a drop zone, a selectable object, or a data source. The widget preview can be used to visualize the widget in the Mendix Studio Pro and Studio. It can be used to render a custom image, a container, a row layout, text, a drop zone, a selectable object, or a data source.
 */
export interface BaseStylingProps {
    /**
     * The type of the preview element
     *
     * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#7-widget-preview-in-structure-mode
     */
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    /**
     * grow is optional and only takes effect if the current element is a child of a row layout
     */
    grow?: number;
}

export interface BlockStylingProps extends BaseStylingProps {
    /**
     * Sets borders around the layout to visually group its children
     */
    borders?: boolean;
    /**
     * Integer. Can be used to create rounded borders
     */
    borderRadius?: number;
    /**
     * Integer. Can be used to set the width of the border
     */
    borderWidth?: number;
    /**
     * HTML color, formatted #RRGGBB
     */
    backgroundColor?: string;
    /**
     * Integer. Adds padding around the container
     */
    padding?: number;
}

export interface TextStylingProps extends BaseStylingProps {
    /**
     * Font size in pixels (Integer)
     */
    fontSize?: number;
    /**
     * HTML color, formatted #RRGGBB
     */
    fontColor?: string;
    /**
     * Boolean. Toggles bold font
     */
    bold?: boolean;
    /**
     * Boolean. Toggles italic font
     */
    italic?: boolean;
}

export interface IImageProps extends BaseStylingProps {
    type: "Image";
    /**
     * Widget image property object from Values API
     */
    property?: object;
    /**
     * Integer. Sets a fixed maximum width
     *
     * A fixed width and height can be set. If not set, it will maximize to the available width. If the width and height are set to an aspect ratio that is different from the original image aspect ratio, it will show a section of the image so the image is not distorted.
     */
    width?: number; // sets a fixed maximum width
    /**
     * Integer. Sets a fixed maximum height
     *
     * A fixed width and height can be set. If not set, it will maximize to the available width. If the width and height are set to an aspect ratio that is different from the original image aspect ratio, it will show a section of the image so the image is not distorted.
     */
    height?: number; // sets a fixed maximum height
}

export interface SVGImageProps extends IImageProps {
    /**
     * An SVG image string
     */
    document: string;
}

/**
 * The SVG image preview type can be used to render an SVG image in the widget preview. The SVG image is passed as a string and can be used to render custom images. The width and height properties can be used to set a fixed maximum width and height for the image.
 *
 * @category Preview
 * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#71-image
 */
export function SvgImage(svgTextData: string, width?: number, height?: number): SVGImageProps {
    return {
        type: "Image",
        document: svgTextData,
        width,
        height
    };
}

export interface ImageProps extends IImageProps {
    /**
     * A base64 encoded image string
     */
    data: string;
}

/**
 * The image preview type can be used to render an image in the widget preview. The image is passed as a base64 encoded string and can be used to render custom images. The width and height properties can be used to set a fixed maximum width and height for the image.
 *
 * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#71-image
 */
export function Image(base64Data: string, width?: number, height?: number): ImageProps {
    return {
        type: "Image",
        data: base64Data,
        width,
        height
    };
}

export interface ContainerProps extends BlockStylingProps {
    type: "Container";
    children?: StructurePreviewProps[];
}

/**
 * Containers can be used to stack multiple elements vertically. These elements are passed as children as an array of props. The borders property can be used to set borders around the whole content to visually group them.
 *
 * @param styleProps - Optional styling properties for the container
 * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#72-container
 */
export function Container(styleProps?: BlockStylingProps): (...children: StructurePreviewProps[]) => ContainerProps {
    return (...children: StructurePreviewProps[]) => {
        return {
            type: "Container",
            ...styleProps,
            children
        } as ContainerProps;
    };
}

export interface RowLayoutStyling extends BlockStylingProps {
    /**
     * When `columnSize` is not set (or set to `"fixed"`) all available space is split into fixed weights. It will then fit the child content into the column, rather than expanding and shrinking the column based on the content size.
     *
     * When `columnSize` is set to `"grow"`, the column sizes are determined by the content. When there is leftover space, the space is distributed over all columns. To influence the relative amount of space into which a child grows, you can set a grow factor for each child. The column will then grow proportionally according to this factor. Children without a grow value automatically receive the value 1.
     */
    columnSize?: "fixed" | "grow";
}

export interface RowLayoutProps extends RowLayoutStyling {
    type: "RowLayout";
    children: StructurePreviewProps[];
}

/**
 * Row layouts are similar to a container, and can be used to render multiple elements horizontally next to each other. They have all the props that a container has, with the addition of a columnSize, which defines whether its children sizes are equal fixed weights or determined by their content.
 *
 * @param styleProps - Optional styling properties for the row layout
 * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#row-layout
 */
export function RowLayout(styleProps?: RowLayoutStyling): (...children: StructurePreviewProps[]) => RowLayoutProps {
    return (...children: StructurePreviewProps[]) => {
        return {
            type: "RowLayout",
            ...styleProps,
            children
        } as RowLayoutProps;
    };
}

export interface TextProps extends TextStylingProps {
    type: "Text";
    content: string;
}

/**
 * The text preview type can be used to render text in the widget preview. The content property is used to set the text that should be shown. The font size, font color, bold, and italic properties can be used to style the text.
 *
 * @param style - Optional styling properties for the text
 * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#74-text
 */
export function Text(style?: TextStylingProps): (content: string) => TextProps {
    /**
     * text that should be shown
     */
    return (content: string) => {
        return {
            type: "Text",
            ...style,
            content
        } as TextProps;
    };
}

export interface DropZoneStylingProps extends BaseStylingProps {
    /**
     * Text to be shown inside the dropzone when empty
     */
    placeholder?: string;
    /**
     * `true` by default. Toggles whether to show a header containing information about the datasource
     */
    showDataSourceHeader?: boolean;
}
export interface DropZoneProps extends DropZoneStylingProps {
    type: "DropZone";
    /**
     * widgets property object from Values API
     */
    property: object;
}

/**
 * The drop zone preview type can be used to add drop zones to the widget preview. It requires a widget property of type widgets to be able to store the information about the containing widgets. If the property has a data source, a header will be shown inside the dropzone containing information about the data source. This header is optional and can be hidden by setting `showDataSourceHeader` to `false`.
 *
 * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#75-drop-zones
 */
export function Dropzone(...options: Array<Partial<DropZoneStylingProps>>): (prop: object) => DropZoneProps {
    const params = Object.assign({}, ...options) as Partial<DropZoneStylingProps>;

    return (property: object) =>
        ({
            type: "DropZone",
            property,
            ...params
        } as DropZoneProps);
}

Dropzone.placeholder = (placeholder: string) => {
    return {
        placeholder
    };
};
Dropzone.hideDataSourceHeaderIf = (hideCondition: boolean) => {
    return hideCondition ? { showDataSourceHeader: false } : {};
};

export interface SelectableProps extends BaseStylingProps {
    type: "Selectable";
    object: object;
    child: StructurePreviewProps;
}

/**
 * The selectable preview type can be used to make an instance of an object list selectable. If an object instance is made selectable, it will behave similar to a widget. Its properties will be shown in the Properties section and can also be edited in a pop-up by double-clicking the section that is visualized by the child properties. Note that this only works in combination with a property of type object.
 *
 * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#76-selectable
 */
export function Selectable(
    object: object,
    style?: BaseStylingProps
): (child: StructurePreviewProps) => SelectableProps {
    return (child: StructurePreviewProps) => {
        return {
            type: "Selectable",
            object,
            child,
            ...style
        } as SelectableProps;
    };
}

export interface DatasourceProps extends BaseStylingProps {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: StructurePreviewProps; // any type of preview property component (optional)
}

/**
 * The datasource preview type can be used when developing a widget with a data source. Using it will render a container with a data source header, similar to other data widgets such as data views or list views. For example, the following will render a data source container with a drop-zone
 *
 * @link https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-config-api/#77-datasource
 */
export function Datasource(property: object | null): (child?: StructurePreviewProps) => DatasourceProps {
    return (child: StructurePreviewProps) => {
        return {
            type: "Datasource",
            property,
            child
        } as DatasourceProps;
    };
}

const alphaHexByPercent = new Map([
    [100, "FF"],
    [99, "FC"],
    [98, "FA"],
    [97, "F7"],
    [96, "F5"],
    [95, "F2"],
    [94, "F0"],
    [93, "ED"],
    [92, "EB"],
    [91, "E8"],
    [90, "E6"],
    [89, "E3"],
    [88, "E0"],
    [87, "DE"],
    [86, "DB"],
    [85, "D9"],
    [84, "D6"],
    [83, "D4"],
    [82, "D1"],
    [81, "CF"],
    [80, "CC"],
    [79, "C9"],
    [78, "C7"],
    [77, "C4"],
    [76, "C2"],
    [75, "BF"],
    [74, "BD"],
    [73, "BA"],
    [72, "B8"],
    [71, "B5"],
    [70, "B3"],
    [69, "B0"],
    [68, "AD"],
    [67, "AB"],
    [66, "A8"],
    [65, "A6"],
    [64, "A3"],
    [63, "A1"],
    [62, "9E"],
    [61, "9C"],
    [60, "99"],
    [59, "96"],
    [58, "94"],
    [57, "91"],
    [56, "8F"],
    [55, "8C"],
    [54, "8A"],
    [53, "87"],
    [52, "85"],
    [51, "82"],
    [50, "80"],
    [49, "7D"],
    [48, "7A"],
    [47, "78"],
    [46, "75"],
    [45, "73"],
    [44, "70"],
    [43, "6E"],
    [42, "6B"],
    [41, "69"],
    [40, "66"],
    [39, "63"],
    [38, "61"],
    [37, "5E"],
    [36, "5C"],
    [35, "59"],
    [34, "57"],
    [33, "54"],
    [32, "52"],
    [31, "4F"],
    [30, "4D"],
    [29, "4A"],
    [28, "47"],
    [27, "45"],
    [26, "42"],
    [25, "40"],
    [24, "3D"],
    [23, "3B"],
    [22, "38"],
    [21, "36"],
    [20, "33"],
    [19, "30"],
    [18, "2E"],
    [17, "2B"],
    [16, "29"],
    [15, "26"],
    [14, "24"],
    [13, "21"],
    [12, "1F"],
    [11, "1C"],
    [10, "1A"],
    [9, "17"],
    [8, "14"],
    [7, "12"],
    [6, "0F"],
    [5, "0D"],
    [4, "0A"],
    [3, "08"],
    [2, "05"],
    [1, "03"],
    [0, "00"]
]);

// Example: colorWithAlpha('#FF0000', 20);
export function colorWithAlpha(color: string, alpha: number): string {
    const xAlpha = alphaHexByPercent.get(alpha);
    if (!xAlpha) {
        throw Error(`Structure preview error: Can't convert alpha value (${alpha}) to hex`);
    }
    return `#${xAlpha}${color.slice(1)}`;
}

const paletteDark = {
    text: {
        primary: "#DEDEDE",
        secondary: "#A4A4A4",
        data: "#579BF9"
    },
    background: {
        topbarData: colorWithAlpha("#3A65E5", 20),
        topbarStandard: colorWithAlpha("#646464", 20),
        buttonInfo: "#579BF9",
        container: "#313131",
        containerDisabled: "#4F4F4F"
    }
} as const;

const paletteLight = {
    text: {
        primary: "#2F3646",
        secondary: "#6B707B",
        data: "#146FF4"
    },
    background: {
        topbarData: "#DCEEFE",
        topbarStandard: "#F7F7F7",
        buttonInfo: "#146FF4",
        container: "#FFFFFF",
        containerDisabled: "#C8C8C8"
    }
} as const;

export const structurePreviewPalette = Object.freeze({
    dark: paletteDark,
    light: paletteLight
});

export type StructurePreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;
