/* eslint-disable */

// IT IS COPY-PASTED AND MODIFIED @types/leaflet 1.4.7

/*
    We use a lot of Leaflet plugins and leaflet private properties. So we need to extend existing Leaflet,
    but leaflet in its typings exports self as a namespace. And it is impossible to change TS namespace declaration.

    That is why we modified typings and enhance them with our properties (private variables & plugins)

    Better solution would be something like:
    ```
        import 'leaflet';
        L.GridLayer.options = L.GridLayerOptions & {
            zIndex?: number;
        };
    ```
    or if leaflet typings would not export namespace and we could do it our way.

    But it is impossible, so we have to do this the complicated way :-/
*/

type InheritedOptionally<All, Inherited extends keyof All> = Omit<All, Inherited> & Partial<Pick<All, Inherited>>;

declare namespace L {
  export type CanvasElement = HTMLCanvasElement & { _leaflet_pos: Point };
  export class Class {
    // @ts-expect-error Leaflet typings
    static extend<T extends Class>(prop: InheritedOptionally<T, keyof Class>): typeof T;
    static include(props: any): any & typeof Class;
    static mergeOptions(props: any): any & typeof Class;

    static addInitHook(initHookFn: () => void): any & typeof Class;
    static addInitHook(methodName: string, ...args: any[]): any & typeof Class;
  }

  export class Transformation {
    constructor(a: number, b: number, c: number, d: number);
    transform(point: Point, scale?: number): Point;
    untransform(point: Point, scale?: number): Point;
  }

  export namespace LineUtil {
    function simplify(points: Point[], tolerance: number): Point[];
    function pointToSegmentDistance(p: Point, p1: Point, p2: Point): number;
    function closestPointOnSegment(p: Point, p1: Point, p2: Point): Point;
    function isFlat(latlngs: LatLngExpression[]): boolean;
  }

  export namespace PolyUtil {
    function clipPolygon(points: Point[], bounds: BoundsExpression, round?: boolean): Point[];
  }

  export namespace DomUtil {
    /**
     * Get Element by its ID or with the given HTML-Element
     */
    function get(element: string | HTMLElement): HTMLElement | null;
    function getStyle(el: HTMLElement, styleAttrib: string): string | null;
    function create(tagName: 'canvas', className?: string, container?: HTMLElement): HTMLCanvasElement;
    function create(tagName: string, className?: string, container?: HTMLElement): HTMLElement;
    function remove(el: HTMLElement): void;
    function empty(el: HTMLElement): void;
    function toFront(el: HTMLElement): void;
    function toBack(el: HTMLElement): void;
    function hasClass(el: HTMLElement, name: string): boolean;
    function addClass(el: HTMLElement, name: string): void;
    function removeClass(el: HTMLElement, name: string): void;
    function setClass(el: HTMLElement, name: string): void;
    function getClass(el: HTMLElement): string;
    function setOpacity(el: HTMLElement, opacity: number): void;
    function testProp(props: string[]): string | false;
    function setTransform(el: HTMLElement, offset?: Point, scale?: number): void;
    function setPosition(el: HTMLElement, position: Point): void;
    function getPosition(el: HTMLElement): Point;
    function disableTextSelection(): void;
    function enableTextSelection(): void;
    function disableImageDrag(): void;
    function enableImageDrag(): void;
    function preventOutline(el: HTMLElement): void;
    function restoreOutline(): void;

    let TRANSFORM: keyof CSSStyleDeclaration;
    let TRANSITION: string;
    let TRANSITION_END: string;
  }

  export interface CRS {
    latLngToPoint(latlng: LatLngExpression, zoom: number): Point;
    pointToLatLng(point: PointExpression, zoom: number): LatLng;
    project(latlng: LatLng | LatLngLiteral): Point;
    unproject(point: PointExpression): LatLng;
    scale(zoom: number): number;
    zoom(scale: number): number;
    getProjectedBounds(zoom: number): Bounds;
    distance(latlng1: LatLngExpression, latlng2: LatLngExpression): number;
    wrapLatLng(latlng: LatLng | LatLngLiteral): LatLng;

    code?: string;
    wrapLng?: [number, number];
    wrapLat?: [number, number];
    infinite: boolean;
  }

  export namespace CRS {
    const EPSG3395: CRS;
    const EPSG3857: CRS;
    const EPSG4326: CRS;
    const Earth: CRS;
    const Simple: CRS;
  }

  export interface Projection {
    project(latlng: LatLng | LatLngLiteral): Point;
    unproject(point: PointExpression): LatLng;

    bounds: Bounds;
  }

  export namespace Projection {
    const LonLat: Projection;
    const Mercator: Projection;
    const SphericalMercator: Projection;
  }

  export class LatLng {
    constructor(latitude: number, longitude: number, altitude?: number);
    equals(otherLatLng: LatLngExpression, maxMargin?: number): boolean;
    toString(): string;
    distanceTo(otherLatLng: LatLngExpression): number;
    wrap(): LatLng;
    toBounds(sizeInMeters: number): LatLngBounds;

    lat: number;
    lng: number;
    alt?: number;
  }

  export interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  export type LatLngTuple = [number, number];

  export type LatLngExpression = LatLng | LatLngLiteral | LatLngTuple;

  export function latLng(latitude: number, longitude: number, altitude?: number): LatLng;

  export function latLng(
    coords: LatLngTuple | [number, number, number] | LatLngLiteral | { lat: number; lng: number; alt?: number },
  ): LatLng;

  export class LatLngBounds {
    constructor(southWest: LatLngExpression, northEast: LatLngExpression);
    constructor(latlngs: LatLngBoundsLiteral);
    extend(latlngOrBounds: LatLngExpression | LatLngBoundsExpression): this;
    pad(bufferRatio: number): LatLngBounds; // does this modify the current instance or does it return a new one?
    getCenter(): LatLng;
    getSouthWest(): LatLng;
    getNorthEast(): LatLng;
    getNorthWest(): LatLng;
    getSouthEast(): LatLng;
    getWest(): number;
    getSouth(): number;
    getEast(): number;
    getNorth(): number;
    contains(otherBoundsOrLatLng: LatLngBoundsExpression | LatLngExpression): boolean;
    intersects(otherBounds: LatLngBoundsExpression): boolean;
    overlaps(otherBounds: BoundsExpression): boolean; // investigate if this is really bounds and not latlngbounds
    toBBoxString(): string;
    equals(otherBounds: LatLngBoundsExpression): boolean;
    isValid(): boolean;
  }

  export type LatLngBoundsLiteral = LatLngTuple[]; // Must be [LatLngTuple, LatLngTuple], cant't change because Map.setMaxBounds

  export type LatLngBoundsExpression = LatLngBounds | LatLngBoundsLiteral;

  export function latLngBounds(southWest: LatLngExpression, northEast: LatLngExpression): LatLngBounds;

  export function latLngBounds(latlngs: LatLngExpression[]): LatLngBounds;

  export type PointTuple = [number, number];

  export class Point {
    constructor(x: number, y: number, round?: boolean);
    clone(): Point;
    add(otherPoint: PointExpression): Point; // non-destructive, returns a new point
    subtract(otherPoint: PointExpression): Point;
    divideBy(num: number): Point;
    multiplyBy(num: number): Point;
    scaleBy(scale: PointExpression): Point;
    unscaleBy(scale: PointExpression): Point;
    round(): Point;
    floor(): Point;
    _floor(): Point;
    ceil(): Point;
    distanceTo(otherPoint: PointExpression): number;
    equals(otherPoint: PointExpression): boolean;
    contains(otherPoint: PointExpression): boolean;
    toString(): string;
    x: number;
    y: number;
  }

  export interface Coords extends Point {
    z: number;
  }

  export type PointExpression = Point | PointTuple;

  export function point(x: number, y: number, round?: boolean): Point;

  export function point(coords: PointTuple | { x: number; y: number }): Point;

  export type BoundsLiteral = [PointTuple, PointTuple];

  export class Bounds {
    constructor(topLeft: PointExpression, bottomRight: PointExpression);
    constructor(points: Point[] | BoundsLiteral);
    extend(point: PointExpression): this;
    getCenter(round?: boolean): Point;
    getBottomLeft(): Point;
    getTopRight(): Point;
    getSize(): Point;
    contains(pointOrBounds: BoundsExpression | PointExpression): boolean;
    intersects(otherBounds: BoundsExpression): boolean;
    overlaps(otherBounds: BoundsExpression): boolean;

    min?: Point;
    max?: Point;
  }

  export type BoundsExpression = Bounds | BoundsLiteral;

  export function bounds(topLeft: PointExpression, bottomRight: PointExpression): Bounds;

  export function bounds(points: Point[] | BoundsLiteral): Bounds;

  export type LeafletEventHandlerFn = (event: LeafletEvent) => void;

  export interface LeafletEventHandlerFnMap {
    [type: string]: LeafletEventHandlerFn;
  }

  /**
   * A set of methods shared between event-powered classes (like Map and Marker).
   * Generally, events allow you to execute some function when something happens
   * with an object (e.g. the user clicks on the map, causing the map to fire
   * 'click' event).
   */
  export abstract class Evented extends Class {
    /**
     * Adds a listener function (fn) to a particular event type of the object.
     * You can optionally specify the context of the listener (object the this
     * keyword will point to). You can also pass several space-separated types
     * (e.g. 'click dblclick').
     */
    on(type: string, fn: LeafletEventHandlerFn, context?: any): this;

    on(type: 'contextmenu', fn: (event: LeafletMouseEvent) => void, context?: any): this;

    /**
     * Adds a set of type/listener pairs, e.g. {click: onClick, mousemove: onMouseMove}
     */
    on(eventMap: LeafletEventHandlerFnMap): this;

    /**
     * Removes a previously added listener function. If no function is specified,
     * it will remove all the listeners of that particular event from the object.
     * Note that if you passed a custom context to on, you must pass the same context
     * to off in order to remove the listener.
     */
    // With an eventMap there are no additional arguments allowed
    // tslint:disable-next-line:unified-signatures
    off(type: string, fn?: LeafletEventHandlerFn, context?: any): this;

    /**
     * Removes a set of type/listener pairs.
     */
    // With an eventMap there are no additional arguments allowed
    // tslint:disable-next-line:unified-signatures
    off(eventMap: LeafletEventHandlerFnMap): this;
    /**
     * Removes all listeners to all events on the object.
     */
    off(): this;

    /**
     * Fires an event of the specified type. You can optionally provide a data
     * object — the first argument of the listener function will contain its properties.
     * The event might can optionally be propagated to event parents.
     */
    fire(type: string, data?: any, propagate?: boolean): this;

    /**
     * Returns true if a particular event type has any listeners attached to it.
     */
    listens(type: string): boolean;

    /**
     * Behaves as on(...), except the listener will only get fired once and then removed.
     */
    once(type: string, fn: LeafletEventHandlerFn, context?: any): this;

    /**
     * Behaves as on(...), except the listener will only get fired once and then removed.
     */
    once(eventMap: LeafletEventHandlerFnMap): this;

    /**
     * Adds an event parent - an Evented that will receive propagated events
     */
    addEventParent(obj: Evented): this;

    /**
     * Removes an event parent, so it will stop receiving propagated events
     */
    removeEventParent(obj: Evented): this;

    /**
     * Alias for on(...)
     *
     * Adds a listener function (fn) to a particular event type of the object.
     * You can optionally specify the context of the listener (object the this
     * keyword will point to). You can also pass several space-separated types
     * (e.g. 'click dblclick').
     */
    addEventListener(type: string, fn: LeafletEventHandlerFn, context?: any): this;

    /**
     * Alias for on(...)
     *
     * Adds a set of type/listener pairs, e.g. {click: onClick, mousemove: onMouseMove}
     */
    addEventListener(eventMap: LeafletEventHandlerFnMap): this;

    /**
     * Alias for off(...)
     *
     * Removes a previously added listener function. If no function is specified,
     * it will remove all the listeners of that particular event from the object.
     * Note that if you passed a custom context to on, you must pass the same context
     * to off in order to remove the listener.
     */
    removeEventListener(type: string, fn?: LeafletEventHandlerFn, context?: any): this;

    /**
     * Alias for off(...)
     *
     * Removes a set of type/listener pairs.
     */
    removeEventListener(eventMap: LeafletEventHandlerFnMap): this;

    /**
     * Alias for off()
     *
     * Removes all listeners to all events on the object.
     */
    clearAllEventListeners(): this;

    /**
     * Alias for once(...)
     *
     * Behaves as on(...), except the listener will only get fired once and then removed.
     */
    addOneTimeEventListener(type: string, fn: LeafletEventHandlerFn, context?: any): this;

    /**
     * Alias for once(...)
     *
     * Behaves as on(...), except the listener will only get fired once and then removed.
     */
    addOneTimeEventListener(eventMap: LeafletEventHandlerFnMap): this;

    /**
     * Alias for fire(...)
     *
     * Fires an event of the specified type. You can optionally provide a data
     * object — the first argument of the listener function will contain its properties.
     * The event might can optionally be propagated to event parents.
     */
    fireEvent(type: string, data?: any, propagate?: boolean): this;

    /**
     * Alias for listens(...)
     *
     * Returns true if a particular event type has any listeners attached to it.
     */
    hasEventListeners(type: string): boolean;
  }

  /**
   * A class for making DOM elements draggable (including touch support).
   * Used internally for map and marker dragging. Only works for elements
   * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
   */
  export class Draggable extends Evented {
    constructor(element: HTMLElement, dragStartTarget?: HTMLElement, preventOutline?: boolean);

    enable(): void;

    disable(): void;

    finishDrag(): void;
  }

  export interface LayerOptions {
    pane?: string;
    attribution?: string;
  }

  export interface InteractiveLayerOptions extends LayerOptions {
    interactive?: boolean;
    bubblingMouseEvents?: boolean;
  }

  export class Layer extends Evented {
    _popup?: L.Popup;

    constructor(options?: LayerOptions);
    // @ts-expect-error Leaflet typings
    static extend<T extends Layer>(prop: InheritedOptionally<T, keyof Layer>): typeof T;
    addTo(map: Map | LayerGroup): this;
    remove(): this;
    removeFrom(map: Map): this;
    getPane(name?: string): HTMLElement | undefined;

    // Popup methods
    bindPopup(content: ((layer: Layer) => Content) | Content | Popup, options?: PopupOptions): this;
    unbindPopup(): this;
    openPopup(latlng?: LatLngExpression): this;
    closePopup(): this;
    togglePopup(): this;
    isPopupOpen(): boolean;
    setPopupContent(content: Content | Popup): this;
    getPopup(): Popup | undefined;

    // Tooltip methods
    bindTooltip(content: ((layer: Layer) => Content) | Tooltip | Content, options?: TooltipOptions): this;
    unbindTooltip(): this;
    openTooltip(latlng?: LatLngExpression): this;
    closeTooltip(): this;
    toggleTooltip(): this;
    isTooltipOpen(): boolean;
    setTooltipContent(content: Content | Tooltip): this;
    getTooltip(): Tooltip | undefined;

    // Extension methods
    onAdd(map: Map): this;
    onRemove(map: Map): this;
    getEvents?(): { [name: string]: (event: LeafletEvent) => void };
    getAttribution?(): string | null;
    beforeAdd?(map: Map): this;

    _removeAllTiles(): void;
    _getTilePos(coords: Coords): Coords;

    public _map: Map;
    public options: LayerOptions;
  }

  export interface GridLayerOptions {
    tileSize?: number | Point;
    opacity?: number;
    updateWhenIdle?: boolean;
    updateWhenZooming?: boolean;
    updateInterval?: number;
    attribution?: string;
    zIndex?: number;
    bounds?: LatLngBoundsExpression;
    minZoom?: number;
    maxZoom?: number;
    noWrap?: boolean;
    pane?: string;
    className?: string;
    keepBuffer?: number;
    disableTransformForTiles?: boolean;
    async?: boolean;
  }

  export type DoneCallback = (error?: Error, tile?: HTMLElement) => void;

  export interface InternalTiles {
    [key: string]: {
      active?: boolean;
      coords: Coords;
      current: boolean;
      el: HTMLDivElement;
      loaded?: Date;
      retain?: boolean;
    };
  }

  export class GridLayer extends Layer {
    constructor(options?: GridLayerOptions);

    // @ts-expect-error Leaflet typings
    static extend<T extends GridLayer>(prop: InheritedOptionally<T, keyof GridLayer>): typeof T;
    bringToFront(): this;
    bringToBack(): this;
    getContainer(): HTMLElement | null;
    setOpacity(opacity: number): this;
    setZIndex(zIndex: number): this;
    isLoading(): boolean;
    redraw(): this;
    // @ts-expect-error Leaflet typings
    onAdd(): void;
    getTileSize(): Point;

    _wrapCoords(coords: Coords): Coords;

    createTile(coords: Coords, done: DoneCallback): HTMLElement;
    _tileCoordsToKey(coords: Coords): string;
    _initContainer(): void;

    _loading: boolean;

    _tiles: InternalTiles;
    _tileZoom?: number;
    public options: GridLayerOptions;
  }

  export function gridLayer(options?: GridLayerOptions): GridLayer;

  export class LatLngGraticule extends Layer {}

  export type TileDefPatch = [number, number, number, number, number];
  export type TileDef = {
    url: string;
    subdomains?: string | string[];
    patchUrl?: string;
    patch?: TileDefPatch;
  };

  export class TileLayerMulti extends TileLayer {
    static extend<T extends TileLayerMulti>(
      prop: InheritedOptionally<T, keyof TileLayerMulti>,
    ): // @ts-expect-error Leaflet typings
    typeof T;
    initialize(tileDefs?: Record<number, L.TileDef>, options?: TileLayerOptions): void;
    // @ts-expect-error Leaflet typings
    setUrl(): void;
    getTileUrl(tilePoint: Point): string;
    _fixTileDef(tileDef: TileDef): TileDef;
  }

  export interface TileLayerOptions extends GridLayerOptions {
    minZoom?: number;
    maxZoom?: number;
    maxNativeZoom?: number;
    minNativeZoom?: number;
    subdomains?: string | string[];
    errorTileUrl?: string;
    zoomOffset?: number;
    tms?: boolean;
    zoomReverse?: boolean;
    detectRetina?: boolean;
    crossOrigin?: CrossOrigin;
    // [name: string]: any;
    // You are able add additional properties, but it makes this interface unchackable.
    // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/15313
    // Example:
    // tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}&{bar}&{abc}', {foo: 'bar', bar: (data: any) => 'foo', abc: () => ''});
  }

  export class TileLayer extends GridLayer {
    constructor(urlTemplate: string, options?: TileLayerOptions);
    initialize(tileDefs?: Record<number, L.TileDef>, options?: TileLayerOptions): void;
    setUrl(url: string, noRedraw?: boolean): this;

    protected _abortLoading(): void;
    public _getZoomForUrl(): number;

    options: TileLayerOptions;
  }

  export function tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;

  export namespace TileLayer {
    class WMS extends TileLayer {
      constructor(baseUrl: string, options: WMSOptions);
      setParams(params: WMSParams, noRedraw?: boolean): this;

      wmsParams: WMSParams;
      options: WMSOptions;
    }
  }

  export interface WMSOptions extends TileLayerOptions {
    layers?: string;
    styles?: string;
    format?: string;
    transparent?: boolean;
    version?: string;
    crs?: CRS;
    uppercase?: boolean;
  }

  export interface WMSParams {
    format?: string;
    layers: string;
    request?: string;
    service?: string;
    styles?: string;
    version?: string;
    transparent?: boolean;
    width?: number;
    height?: number;
  }

  export namespace tileLayer {
    function wms(baseUrl: string, options?: WMSOptions): TileLayer.WMS;
  }

  export type CrossOrigin = boolean | string;

  export interface ImageOverlayOptions extends InteractiveLayerOptions {
    opacity?: number;
    alt?: string;
    interactive?: boolean;
    attribution?: string;
    crossOrigin?: CrossOrigin;
    errorOverlayUrl?: string;
    zIndex?: number;
    className?: string;
    angle?: number;
  }

  export class ImageOverlay extends Layer {
    constructor(imageUrl: string, bounds: LatLngBoundsExpression, options?: ImageOverlayOptions);
    setOpacity(opacity: number): this;
    bringToFront(): this;
    bringToBack(): this;
    setUrl(url: string): this;

    /** Update the bounds that this ImageOverlay covers */
    setBounds(bounds: LatLngBounds): this;

    /** Changes the zIndex of the image overlay */
    setZIndex(value: number): this;

    /** Get the bounds that this ImageOverlay covers */
    getBounds(): LatLngBounds;

    /** Get the img element that represents the ImageOverlay on the map */
    getElement(): HTMLImageElement | undefined;

    options: ImageOverlayOptions;

    _reset(): void;
    _animateZoom(e: HTMLDivElement): void;

    _image: HTMLImageElement;
    _bounds: LatLngBounds;
  }

  export function imageOverlay(
    imageUrl: string,
    bounds: LatLngBoundsExpression,
    options?: ImageOverlayOptions,
  ): ImageOverlay;

  export interface VideoOverlayOptions extends ImageOverlayOptions {
    autoplay?: boolean;
    loop?: boolean;
  }

  export class VideoOverlay extends Layer {
    /** VideoOverlay doesn't extend ImageOverlay because ImageOverlay.getElement returns HTMLImageElement */
    constructor(
      video: string | string[] | HTMLVideoElement,
      bounds: LatLngBoundsExpression,
      options?: VideoOverlayOptions,
    );
    setOpacity(opacity: number): this;
    bringToFront(): this;
    bringToBack(): this;
    setUrl(url: string): this;

    /** Update the bounds that this VideoOverlay covers */
    setBounds(bounds: LatLngBounds): this;

    /** Get the bounds that this VideoOverlay covers */
    getBounds(): LatLngBounds;

    /** Get the video element that represents the VideoOverlay on the map */
    getElement(): HTMLVideoElement | undefined;

    options: VideoOverlayOptions;
  }

  export function videoOverlay(
    video: string | string[] | HTMLVideoElement,
    bounds: LatLngBoundsExpression,
    options?: VideoOverlayOptions,
  ): VideoOverlay;

  export type LineCapShape = 'butt' | 'round' | 'square' | 'inherit';

  export type LineJoinShape = 'miter' | 'round' | 'bevel' | 'inherit';

  export type FillRule = 'nonzero' | 'evenodd' | 'inherit';

  export interface PathOptions extends InteractiveLayerOptions {
    stroke?: boolean;
    color?: string;
    weight?: number;
    opacity?: number;
    lineCap?: LineCapShape;
    lineJoin?: LineJoinShape;
    dashArray?: string | number[];
    dashOffset?: string;
    fill?: boolean;
    fillColor?: string;
    fillOpacity?: number;
    fillRule?: FillRule;
    renderer?: Renderer;
    className?: string;
  }

  export abstract class Path extends Layer {
    _latlngs: LatLng[];
    redraw(): this;
    setStyle(style: PathOptions): this;
    bringToFront(): this;
    bringToBack(): this;
    getElement(): Element | undefined;

    options: PathOptions;
  }

  export interface PolylineOptions extends PathOptions {
    smoothFactor?: number;
    noClip?: boolean;
  }

  export class Polyline<
    T extends import('geojson').GeometryObject = import('geojson').LineString | import('geojson').MultiLineString,
    P = any,
  > extends Path {
    constructor(latlngs: LatLngExpression[] | LatLngExpression[][], options?: PolylineOptions);
    toGeoJSON(): import('geojson').Feature<T, P>;
    getLatLngs(): LatLng[] | LatLng[][] | LatLng[][][];
    setLatLngs(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]): this;
    isEmpty(): boolean;
    getCenter(): LatLng;
    getBounds(): LatLngBounds;
    addLatLng(latlng: LatLngExpression | LatLngExpression[]): this;

    feature?: import('geojson').Feature<T, P>;
    options: PolylineOptions;
  }

  export function polyline(latlngs: LatLngExpression[] | LatLngExpression[][], options?: PolylineOptions): Polyline;

  export class Polygon<P = any> extends Polyline<import('geojson').Polygon | import('geojson').MultiPolygon, P> {
    constructor(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][], options?: PolylineOptions);
  }

  export function polygon(
    latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][],
    options?: PolylineOptions,
  ): Polygon;

  export class Rectangle<P = any> extends Polygon<P> {
    constructor(latLngBounds: LatLngBoundsExpression, options?: PolylineOptions);
    setBounds(latLngBounds: LatLngBoundsExpression): this;
  }

  export function rectangle(latLngBounds: LatLngBoundsExpression, options?: PolylineOptions): Rectangle;

  export interface CircleMarkerOptions extends PathOptions {
    radius?: number;
  }

  export class CircleMarker<P = any> extends Path {
    constructor(latlng: LatLngExpression, options?: CircleMarkerOptions);
    toGeoJSON(): import('geojson').Feature<import('geojson').Point, P>;
    setLatLng(latLng: LatLngExpression): this;
    getLatLng(): LatLng;
    setRadius(radius: number): this;
    getRadius(): number;

    options: CircleMarkerOptions;
    feature?: import('geojson').Feature<import('geojson').Point, P>;
  }

  export function circleMarker(latlng: LatLngExpression, options?: CircleMarkerOptions): CircleMarker;

  export class Circle<P = any> extends CircleMarker<P> {
    constructor(latlng: LatLngExpression, options?: CircleMarkerOptions);
    constructor(latlng: LatLngExpression, radius: number, options?: CircleMarkerOptions); // deprecated!
    getBounds(): LatLngBounds;
  }

  export function circle(latlng: LatLngExpression, options?: CircleMarkerOptions): Circle;
  export function circle(latlng: LatLngExpression, radius: number, options?: CircleMarkerOptions): Circle; // deprecated!

  export interface RendererOptions extends LayerOptions {
    padding?: number;
  }

  export class Renderer extends Layer {
    constructor(options?: RendererOptions);

    options: RendererOptions;
  }

  export class SVG extends Renderer {}

  export namespace SVG {
    function create(name: string): SVGElement;

    function pointsToPath(rings: PointExpression[], close: boolean): string;
  }

  export function svg(options?: RendererOptions): SVG;

  export class Canvas extends Renderer {}

  export function canvas(options?: RendererOptions): Canvas;

  /**
   * Used to group several layers and handle them as one.
   * If you add it to the map, any layers added or removed from the group will be
   * added/removed on the map as well. Extends Layer.
   */
  export class LayerGroup<P = any> extends Layer {
    constructor(layers?: Layer[], options?: LayerOptions);

    /**
     * Returns a GeoJSON representation of the layer group (as a GeoJSON GeometryCollection, GeoJSONFeatureCollection or Multipoint).
     */
    toGeoJSON():
      | import('geojson').FeatureCollection<import('geojson').GeometryObject, P>
      | import('geojson').Feature<import('geojson').MultiPoint, P>
      | import('geojson').GeometryCollection;

    /**
     * Adds the given layer to the group.
     */
    addLayer(layer: Layer): this;

    /**
     * Removes the layer with the given internal ID or the given layer from the group.
     */
    removeLayer(layer: number | Layer): this;

    /**
     * Returns true if the given layer is currently added to the group.
     */
    hasLayer(layer: Layer): boolean;

    /**
     * Removes all the layers from the group.
     */
    clearLayers(): this;

    /**
     * Calls methodName on every layer contained in this group, passing any additional parameters.
     * Has no effect if the layers contained do not implement methodName.
     */
    invoke(methodName: string, ...params: any[]): this;

    /**
     * Iterates over the layers of the group,
     * optionally specifying context of the iterator function.
     */
    eachLayer(fn: (layer: Layer) => void, context?: any): this;

    /**
     * Returns the layer with the given internal ID.
     */
    getLayer(id: number): Layer | undefined;

    /**
     * Returns an array of all the layers added to the group.
     */
    getLayers(): Layer[];

    /**
     * Calls setZIndex on every layer contained in this group, passing the z-index.
     */
    setZIndex(zIndex: number): this;

    /**
     * Returns the internal ID for a layer
     */
    getLayerId(layer: Layer): number;

    feature?:
      | import('geojson').FeatureCollection<import('geojson').GeometryObject, P>
      | import('geojson').Feature<import('geojson').MultiPoint, P>
      | import('geojson').GeometryCollection;
  }

  /**
   * Create a layer group, optionally given an initial set of layers and an `options` object.
   */
  export function layerGroup(layers?: Layer[], options?: LayerOptions): LayerGroup;

  /**
   * Extended LayerGroup that also has mouse events (propagated from
   * members of the group) and a shared bindPopup method.
   */
  export class FeatureGroup<P = any> extends LayerGroup<P> {
    /**
     * Sets the given path options to each layer of the group that has a setStyle method.
     */
    setStyle(style: PathOptions): this;

    /**
     * Brings the layer group to the top of all other layers
     */
    bringToFront(): this;

    /**
     * Brings the layer group to the top [sic] of all other layers
     */
    bringToBack(): this;

    /**
     * Returns the LatLngBounds of the Feature Group (created from
     * bounds and coordinates of its children).
     */
    getBounds(): LatLngBounds;
  }

  /**
   * Create a feature group, optionally given an initial set of layers.
   */
  export function featureGroup(layers?: Layer[]): FeatureGroup;

  export type StyleFunction<P = any> = (
    feature?: import('geojson').Feature<import('geojson').GeometryObject, P>,
  ) => PathOptions;

  export interface GeoJSONOptions<P = any> extends LayerOptions {
    /**
     * A Function defining how GeoJSON points spawn Leaflet layers.
     * It is internally called when data is added, passing the GeoJSON point
     * feature and its LatLng.
     *
     * The default is to spawn a default Marker:
     *
     * ```
     * function(geoJsonPoint, latlng) {
     *     return L.marker(latlng);
     * }
     * ```
     */
    pointToLayer?(geoJsonPoint: import('geojson').Feature<import('geojson').Point, P>, latlng: LatLng): Layer; // should import GeoJSON typings

    /**
     * PathOptions or a Function defining the Path options for styling GeoJSON lines and polygons,
     * called internally when data is added.
     *
     * The default value is to not override any defaults:
     *
     * ```
     * function (geoJsonFeature) {
     *     return {}
     * }
     * ```
     */
    style?: PathOptions | StyleFunction<P>;

    /**
     * A Function that will be called once for each created Feature, after it
     * has been created and styled. Useful for attaching events and popups to features.
     *
     * The default is to do nothing with the newly created layers:
     *
     * ```
     * function (feature, layer) {}
     * ```
     */
    onEachFeature?(feature: import('geojson').Feature<import('geojson').GeometryObject, P>, layer: Layer): void;

    /**
     * A Function that will be used to decide whether to show a feature or not.
     *
     * The default is to show all features:
     *
     * ```
     * function (geoJsonFeature) {
     *     return true;
     * }
     * ```
     */
    filter?(geoJsonFeature: import('geojson').Feature<import('geojson').GeometryObject, P>): boolean;

    /**
     * A Function that will be used for converting GeoJSON coordinates to LatLngs.
     * The default is the coordsToLatLng static method.
     */
    coordsToLatLng?(coords: [number, number] | [number, number, number]): LatLng; // check if LatLng has an altitude property
  }

  /**
   * Represents a GeoJSON object or an array of GeoJSON objects.
   * Allows you to parse GeoJSON data and display it on the map. Extends FeatureGroup.
   */
  export class GeoJSON<P = any> extends FeatureGroup<P> {
    /**
     * Creates a Layer from a given GeoJSON feature. Can use a custom pointToLayer
     * and/or coordsToLatLng functions if provided as options.
     */
    static geometryToLayer<P = any>(
      featureData: import('geojson').Feature<import('geojson').GeometryObject, P>,
      options?: GeoJSONOptions<P>,
    ): Layer;

    /**
     * Creates a LatLng object from an array of 2 numbers (longitude, latitude) or
     * 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.
     */
    static coordsToLatLng(coords: [number, number] | [number, number, number]): LatLng;

    /**
     * Creates a multidimensional array of LatLngs from a GeoJSON coordinates array.
     * levelsDeep specifies the nesting level (0 is for an array of points, 1 for an array of
     * arrays of points, etc., 0 by default).
     * Can use a custom coordsToLatLng function.
     */
    static coordsToLatLngs(
      coords: any[],
      levelsDeep?: number,
      coordsToLatLng?: (coords: [number, number] | [number, number, number]) => LatLng,
    ): any[]; // Using any[] to avoid artificially limiting valid calls

    /**
     * Reverse of coordsToLatLng
     */
    static latLngToCoords(latlng: LatLng): [number, number] | [number, number, number];

    /**
     * Reverse of coordsToLatLngs closed determines whether the first point should be
     * appended to the end of the array to close the feature, only used when levelsDeep is 0.
     * False by default.
     */
    static latLngsToCoords(latlngs: any[], levelsDeep?: number, closed?: boolean): any[]; // Using any[] to avoid artificially limiting valid calls

    /**
     * Normalize GeoJSON geometries/features into GeoJSON features.
     */
    static asFeature<P = any>(
      geojson: import('geojson').Feature<import('geojson').GeometryObject, P> | import('geojson').GeometryObject,
    ): import('geojson').Feature<import('geojson').GeometryObject, P>;

    constructor(geojson?: import('geojson').GeoJsonObject, options?: GeoJSONOptions<P>);
    /**
     * Adds a GeoJSON object to the layer.
     */
    addData(data: import('geojson').GeoJsonObject): Layer;

    /**
     * Resets the given vector layer's style to the original GeoJSON style,
     * useful for resetting style after hover events.
     */
    resetStyle(layer: Layer): Layer;

    /**
     * Same as FeatureGroup's setStyle method, but style-functions are also
     * allowed here to set the style according to the feature.
     */
    setStyle(style: PathOptions | StyleFunction<P>): this;

    options: GeoJSONOptions<P>;
  }

  /**
   * Creates a GeoJSON layer.
   *
   * Optionally accepts an object in GeoJSON format to display on the
   * map (you can alternatively add it later with addData method) and
   * an options object.
   */
  export function geoJSON<P = any>(geojson?: import('geojson').GeoJsonObject, options?: GeoJSONOptions<P>): GeoJSON<P>;

  export type Zoom = boolean | 'center';

  export interface MapOptions {
    preferCanvas?: boolean;

    // Control options
    attributionControl?: boolean;
    zoomControl?: boolean;

    // Interaction options
    closePopupOnClick?: boolean;
    zoomSnap?: number;
    zoomDelta?: number;
    trackResize?: boolean;
    boxZoom?: boolean;
    doubleClickZoom?: Zoom;
    dragging?: boolean;

    // Map state options
    crs?: CRS;
    center?: LatLngExpression;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    layers?: Layer[];
    maxBounds?: LatLngBoundsExpression;
    renderer?: Renderer;

    // Animation options
    fadeAnimation?: boolean;
    markerZoomAnimation?: boolean;
    transform3DLimit?: number;
    zoomAnimation?: boolean;
    zoomAnimationThreshold?: number;

    // Panning inertia options
    inertia?: boolean;
    inertiaDeceleration?: number;
    inertiaMaxSpeed?: number;
    easeLinearity?: number;
    worldCopyJump?: boolean;
    maxBoundsViscosity?: number;

    // Keyboard navigation options
    keyboard?: boolean;
    keyboardPanDelta?: number;

    // Mousewheel options
    scrollWheelZoom?: Zoom;
    wheelDebounceTime?: number;
    wheelPxPerZoomLevel?: number;

    // Touch interaction options
    tap?: boolean;
    tapTolerance?: number;
    touchZoom?: Zoom;
    bounceAtZoomLimits?: boolean;
  }

  export type ControlPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

  export interface ControlOptions {
    position?: ControlPosition;
  }

  export class Control extends Class {
    // @ts-expect-error Leaflet typings
    static extend<T extends Control>(prop: InheritedOptionally<T, keyof Control>): typeof T;
    constructor(options?: ControlOptions);
    getPosition(): ControlPosition;
    setPosition(position: ControlPosition): this;
    getContainer(): HTMLElement | undefined;
    addTo(map: Map): this;
    remove(): this;

    // Extension methods
    onAdd?(map: Map): HTMLElement;
    onRemove?(map: Map): void;

    options: ControlOptions;
  }

  export namespace Control {
    interface ZoomOptions extends ControlOptions {
      zoomInText?: string;
      zoomInTitle?: string;
      zoomOutText?: string;
      zoomOutTitle?: string;
    }

    class Zoom extends Control {
      constructor(options?: ZoomOptions);
      options: ZoomOptions;
    }

    interface AttributionOptions extends ControlOptions {
      prefix?: string | boolean;
    }

    class Attribution extends Control {
      constructor(options?: AttributionOptions);
      setPrefix(prefix: string): this;
      addAttribution(text: string): this;
      removeAttribution(text: string): this;
      options: AttributionOptions;
    }

    interface LayersOptions extends ControlOptions {
      collapsed?: boolean;
      autoZIndex?: boolean;
      hideSingleBase?: boolean;
    }

    interface LayersObject {
      [name: string]: Layer;
    }

    class Layers extends Control {
      constructor(baseLayers?: LayersObject, overlays?: LayersObject, options?: LayersOptions);
      addBaseLayer(layer: Layer, name: string): this;
      addOverlay(layer: Layer, name: string): this;
      removeLayer(layer: Layer): this;
      expand(): this;
      collapse(): this;
      options: LayersOptions;
    }

    interface ScaleOptions extends ControlOptions {
      maxWidth?: number;
      metric?: boolean;
      imperial?: boolean;
      updateWhenIdle?: boolean;
    }

    class Scale extends Control {
      constructor(options?: ScaleOptions);
      options: ScaleOptions;
      _iScale: boolean;
      _getRoundNum(this: this, maxFeet: number): number;
      _updateScales(this: this, maxMeters: number): void;
    }
  }

  export namespace control {
    function zoom(options?: Control.ZoomOptions): Control.Zoom;

    function attribution(options?: Control.AttributionOptions): Control.Attribution;

    function layers(
      baseLayers?: Control.LayersObject,
      overlays?: Control.LayersObject,
      options?: Control.LayersOptions,
    ): Control.Layers;

    function scale(options?: Control.ScaleOptions): Control.Scale;
  }

  export interface DivOverlayOptions {
    offset?: PointExpression;
    zoomAnimation?: boolean;
    className?: string;
    pane?: string;
  }

  export interface PopupOptions extends DivOverlayOptions {
    maxWidth?: number;
    minWidth?: number;
    maxHeight?: number;
    keepInView?: boolean;
    closeButton?: boolean;
    autoPan?: boolean;
    autoPanPaddingTopLeft?: PointExpression;
    autoPanPaddingBottomRight?: PointExpression;
    autoPanPadding?: PointExpression;
    autoClose?: boolean;
    closeOnClick?: boolean;
    closeOnEscapeKey?: boolean;
  }

  export type Content = string | HTMLElement;

  export class Popup extends Layer {
    constructor(options?: PopupOptions, source?: Layer);
    getLatLng(): LatLng | undefined;
    setLatLng(latlng: LatLngExpression): this;
    getContent(): Content | ((source: Layer) => Content) | undefined;
    setContent(htmlContent: ((source: Layer) => Content) | Content): this;
    getElement(): HTMLElement | undefined;
    update(): void;
    isOpen(): boolean;
    bringToFront(): this;
    bringToBack(): this;
    openOn(map: Map): this;

    options: PopupOptions;
  }

  export function popup(options?: PopupOptions, source?: Layer): Popup;

  export type Direction = 'right' | 'left' | 'top' | 'bottom' | 'center' | 'auto';

  export interface TooltipOptions extends DivOverlayOptions {
    pane?: string;
    offset?: PointExpression;
    direction?: Direction;
    permanent?: boolean;
    sticky?: boolean;
    interactive?: boolean;
    opacity?: number;
  }

  export class Tooltip extends Layer {
    constructor(options?: TooltipOptions, source?: Layer);
    setOpacity(val: number): void;
    getLatLng(): LatLng | undefined;
    setLatLng(latlng: LatLngExpression): this;
    getContent(): Content | undefined;
    setContent(htmlContent: ((source: Layer) => Content) | Content): this;
    getElement(): HTMLElement | undefined;
    update(): void;
    isOpen(): boolean;
    bringToFront(): this;
    bringToBack(): this;

    options: TooltipOptions;
  }

  export function tooltip(options?: TooltipOptions, source?: Layer): Tooltip;

  export interface ZoomOptions {
    animate?: boolean;
  }

  export interface PanOptions {
    animate?: boolean;
    duration?: number;
    easeLinearity?: number;
    noMoveStart?: boolean;
  }

  // This is not empty, it extends two interfaces into one...
  export interface ZoomPanOptions extends ZoomOptions, PanOptions {}

  export interface FitBoundsOptions extends ZoomOptions, PanOptions {
    paddingTopLeft?: PointExpression;
    paddingBottomRight?: PointExpression;
    padding?: PointExpression;
    maxZoom?: number;
  }

  export interface PanInsideOptions {
    paddingTopLeft?: PointExpression;
    paddingBottomRight?: PointExpression;
    padding?: PointExpression;
  }

  export interface LocateOptions {
    watch?: boolean;
    setView?: boolean;
    maxZoom?: number;
    timeout?: number;
    maximumAge?: number;
    enableHighAccuracy?: boolean;
  }

  export class Handler extends Class {
    constructor(map: Map);
    enable(): this;
    disable(): this;
    enabled(): boolean;

    // Extension methods
    addHooks?(): void;
    removeHooks?(): void;
  }

  export interface LeafletEvent {
    type: string;
    target: any;
  }

  export interface LeafletMouseEvent extends LeafletEvent {
    latlng: LatLng;
    layerPoint: Point;
    containerPoint: Point;
    originalEvent: MouseEvent & {
      target?: HTMLElement;
    };
  }

  export interface LeafletKeyboardEvent extends LeafletEvent {
    originalEvent: KeyboardEvent;
  }

  export interface LocationEvent extends LeafletEvent {
    latlng: LatLng;
    bounds: LatLngBounds;
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    speed: number;
    timestamp: number;
  }

  export interface ErrorEvent extends LeafletEvent {
    message: string;
    code: number;
  }

  export interface LayerEvent extends LeafletEvent {
    layer: Layer;
  }

  export interface LayersControlEvent extends LayerEvent {
    name: string;
  }

  export interface TileEvent extends LeafletEvent {
    tile: HTMLImageElement;
    coords: Point; // apparently not a normal point, since docs say it has z (zoom)
  }

  export interface TileErrorEvent extends TileEvent {
    error: Error;
  }

  export interface ResizeEvent extends LeafletEvent {
    oldSize: Point;
    newSize: Point;
  }

  export interface GeoJSONEvent extends LeafletEvent {
    layer: Layer;
    properties: any;
    geometryType: string;
    id: string;
  }

  export interface PopupEvent extends LeafletEvent {
    popup: Popup;
  }

  export interface TooltipEvent extends LeafletEvent {
    tooltip: Tooltip;
  }

  export interface DragEndEvent extends LeafletEvent {
    distance: number;
  }

  export interface ZoomAnimEvent extends LeafletEvent {
    center: LatLng;
    zoom: number;
    noUpdate: boolean;
  }

  export namespace DomEvent {
    type EventHandlerFn = (event: Event) => void;

    function on(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;

    function on(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;

    function off(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;

    function off(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;

    function stopPropagation(ev: Event): typeof DomEvent;

    function disableScrollPropagation(el: HTMLElement): typeof DomEvent;

    function disableClickPropagation(el: HTMLElement): typeof DomEvent;

    function preventDefault(ev: Event): typeof DomEvent;

    function stop(ev: Event): typeof DomEvent;

    function getMousePosition(ev: MouseEvent, container?: HTMLElement): Point;

    function getWheelDelta(ev: Event): number;

    function addListener(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;

    function addListener(
      el: HTMLElement,
      eventMap: { [eventName: string]: EventHandlerFn },
      context?: any,
    ): typeof DomEvent;

    function removeListener(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;

    function removeListener(
      el: HTMLElement,
      eventMap: { [eventName: string]: EventHandlerFn },
      context?: any,
    ): typeof DomEvent;
  }

  export interface DefaultMapPanes {
    mapPane: HTMLElement;
    tilePane: HTMLElement;
    overlayPane: HTMLElement;
    shadowPane: HTMLElement;
    markerPane: HTMLElement;
    tooltipPane: HTMLElement;
    popupPane: HTMLElement;
  }

  export class Map extends Evented {
    constructor(element: string | HTMLElement, options?: MapOptions);
    getRenderer(layer: Path): Renderer;

    // Methods for layers and controls
    addControl(control: Control): this;
    removeControl(control: Control): this;
    addLayer(layer: Layer | GridLayer): this;
    removeLayer(layer: Layer | GridLayer): this;
    hasLayer(layer: Layer | GridLayer): boolean;
    eachLayer(fn: (layer: Layer | GridLayer) => void, context?: any): this;
    openPopup(popup: Popup): this;
    openPopup(content: Content, latlng: LatLngExpression, options?: PopupOptions): this;
    closePopup(popup?: Popup): this;
    openTooltip(tooltip: Tooltip): this;
    openTooltip(content: Content, latlng: LatLngExpression, options?: TooltipOptions): this;
    closeTooltip(tooltip?: Tooltip): this;

    // Methods for modifying map state
    setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this;
    setZoom(zoom: number, options?: ZoomPanOptions): this;
    zoomIn(delta?: number, options?: ZoomOptions): this;
    zoomOut(delta?: number, options?: ZoomOptions): this;
    setZoomAround(position: Point | LatLngExpression, zoom: number, options?: ZoomOptions): this;
    fitBounds(bounds: LatLngBoundsExpression, options?: FitBoundsOptions): this;
    fitWorld(options?: FitBoundsOptions): this;
    panTo(latlng: LatLngExpression, options?: PanOptions): this;
    panBy(offset: PointExpression, options?: PanOptions): this;
    setMaxBounds(bounds: LatLngBoundsExpression): this;
    setMinZoom(zoom: number): this;
    setMaxZoom(zoom: number): this;
    panInside(latLng: LatLngExpression, options?: PanInsideOptions): this;
    panInsideBounds(bounds: LatLngBoundsExpression, options?: PanOptions): this;
    /**
     * Boolean for animate or advanced ZoomPanOptions
     */
    invalidateSize(options?: boolean | ZoomPanOptions): this;
    stop(): this;
    flyTo(latlng: LatLngExpression, zoom?: number, options?: ZoomPanOptions): this;
    flyToBounds(bounds: LatLngBoundsExpression, options?: FitBoundsOptions): this;

    // Other methods
    addHandler(name: string, HandlerClass: typeof Handler): this; // Alternatively, HandlerClass: new(map: Map) => Handler
    remove(): this;
    createPane(name: string, container?: HTMLElement): HTMLElement;
    /**
     * Name of the pane or the pane as HTML-Element
     */
    getPane(pane: string | HTMLElement): HTMLElement | undefined;
    getPanes(): { [name: string]: HTMLElement } & DefaultMapPanes;
    getContainer(): HTMLElement;
    whenReady(fn: () => void, context?: any): this;

    // Methods for getting map state
    getCenter(): LatLng;
    getZoom(): number;
    getBounds(): LatLngBounds;
    getMinZoom(): number;
    getMaxZoom(): number;
    getBoundsZoom(bounds: LatLngBoundsExpression, inside?: boolean): number;
    getSize(): Point;
    getPixelBounds(): Bounds;
    getPixelOrigin(): Point;
    getPixelWorldBounds(zoom?: number): Bounds;

    // Conversion methods
    getZoomScale(toZoom: number, fromZoom?: number): number;
    getScaleZoom(scale: number, fromZoom: number): number;
    project(latlng: LatLngExpression, zoom: number): Point;
    unproject(point: PointExpression, zoom: number): LatLng;
    layerPointToLatLng(point: PointExpression): LatLng;
    latLngToLayerPoint(latlng: LatLngExpression): Point;
    wrapLatLng(latlng: LatLngExpression): LatLng;
    wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds;
    distance(latlng1: LatLngExpression, latlng2: LatLngExpression): number;
    containerPointToLayerPoint(point: PointExpression): Point;
    containerPointToLatLng(point: PointExpression): LatLng;
    layerPointToContainerPoint(point: PointExpression): Point;
    latLngToContainerPoint(latlng: LatLngExpression): Point;
    mouseEventToContainerPoint(ev: MouseEvent): Point;
    mouseEventToLayerPoint(ev: MouseEvent): Point;
    mouseEventToLatLng(ev: MouseEvent): LatLng;

    // Geolocation methods
    locate(options?: LocateOptions): this;
    stopLocate(): this;

    // Properties
    boxZoom: Handler;
    doubleClickZoom: Handler;
    dragging: Handler;
    keyboard: Handler;
    scrollWheelZoom: Handler;
    tap?: Handler;
    touchZoom: Handler;
    zoomControl: Control.Zoom;

    options: MapOptions;
    _zoomCenter?: Point;
    _latLngBoundsToNewLayerBounds(latLngBounds: LatLngBounds, zoom: number, center: LatLng): Bounds;
    // function (latLngBounds, zoom, center) {
    //     var topLeft = this._getNewPixelOrigin(center, zoom);
    //     return toBounds([
    //         this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
    //         this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
    //         this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
    //         this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
    //     ]);
    // }

    _removeZoomLimit(instance: unknown): void;

    _getTopLeftPoint(): L.Point;

    _getMapPanePos(): L.Point;
  }

  /**
   * ID of a HTML-Element as string or the HTML-ELement itself
   */
  export function map(element: string | HTMLElement, options?: MapOptions): Map;

  export interface BaseIconOptions extends LayerOptions {
    iconUrl?: string;
    iconRetinaUrl?: string;
    iconSize?: PointExpression;
    iconAnchor?: PointExpression;
    popupAnchor?: PointExpression;
    tooltipAnchor?: PointExpression;
    shadowUrl?: string | null;
    shadowRetinaUrl?: string;
    shadowSize?: PointExpression;
    shadowAnchor?: PointExpression;
    className?: string;
  }

  export interface IconOptions extends BaseIconOptions {
    iconUrl?: string;
    anchorRef?: { x?: number; y?: number };
    anchorType?: { x?: 'pixels' | 'fraction'; y?: 'pixels' | 'fraction' };
  }

  export class Icon<T extends BaseIconOptions = IconOptions> extends Layer {
    constructor(options: T);
    createIcon(oldIcon?: HTMLElement): HTMLElement;
    createShadow(oldIcon?: HTMLElement): HTMLElement;
    _setIconStyles(img: HTMLImageElement, name: string): void;

    options: T;
  }

  export namespace Icon {
    interface DefaultIconOptions extends BaseIconOptions {
      imagePath?: string;
    }

    class Default extends Icon<DefaultIconOptions> {
      static imagePath?: string;
      constructor(options?: DefaultIconOptions);
    }
  }

  export function icon(options: IconOptions): Icon;

  export interface DivIconOptions extends BaseIconOptions {
    html?: string | HTMLElement | false;
    bgPos?: PointExpression;
    iconSize?: PointExpression;
    iconAnchor?: PointExpression;
    popupAnchor?: PointExpression;
    className?: string;
  }

  export class DivIcon extends Icon<DivIconOptions> {
    constructor(options?: DivIconOptions);
  }

  export function divIcon(options?: DivIconOptions): DivIcon;

  export interface MarkerOptions extends InteractiveLayerOptions {
    icon?: Icon | DivIcon;
    clickable?: boolean;
    draggable?: boolean;
    keyboard?: boolean;
    title?: string;
    alt?: string;
    zIndexOffset?: number;
    opacity?: number;
    riseOnHover?: boolean;
    riseOffset?: number;
    autoPan?: boolean;
    autoPanSpeed?: number;
    autoPanPadding?: PointExpression;
  }

  export class Marker<P = any> extends Layer {
    constructor(latlng: LatLngExpression, options?: MarkerOptions);
    toGeoJSON(): import('geojson').Feature<import('geojson').Point, P>;
    getLatLng(): LatLng;
    setLatLng(latlng: LatLngExpression): this;
    setZIndexOffset(offset: number): this;
    setIcon(icon: Icon | DivIcon): this;
    setOpacity(opacity: number): this;
    getElement(): HTMLElement | undefined;

    // Properties
    options: MarkerOptions;
    dragging?: Handler;
    feature?: import('geojson').Feature<import('geojson').Point, P>;
    _icon: HTMLDivElement;
    _latlng: LatLng;
  }

  export function marker(latlng: LatLngExpression, options?: MarkerOptions): Marker;

  export namespace Browser {
    // sorting according to https://leafletjs.com/reference-1.5.0.html#browser
    const ie: boolean;
    const ielt9: boolean;
    const edge: boolean;
    const webkit: boolean;
    const android: boolean;
    const android23: boolean;
    const androidStock: boolean;
    const opera: boolean;
    const chrome: boolean;
    const gecko: boolean;
    const safari: boolean;
    const opera12: boolean;
    const win: boolean;
    const ie3d: boolean;
    const webkit3d: boolean;
    const gecko3d: boolean;
    const any3d: boolean;
    const mobile: boolean;
    const mobileWebkit: boolean;
    const mobileWebkit3d: boolean;
    const msPointer: boolean;
    const pointer: boolean;
    const touch: boolean;
    const mobileOpera: boolean;
    const mobileGecko: boolean;
    const retina: boolean;
    const canvas: boolean;
    const svg: boolean;
    const vml: boolean;
  }

  export namespace Util {
    function extend<D extends object, S1 extends object = {}>(dest: D, src?: S1): D & S1;
    function extend<D extends object, S1 extends object, S2 extends object>(dest: D, src1: S1, src2: S2): D & S1 & S2;
    function extend<D extends object, S1 extends object, S2 extends object, S3 extends object>(
      dest: D,
      src1: S1,
      src2: S2,
      src3: S3,
    ): D & S1 & S2 & S3;
    function extend(dest: any, ...src: any[]): any;

    function create(proto: object | null, properties?: PropertyDescriptorMap): any;
    function bind(fn: () => void, ...obj: any[]): () => void;
    function stamp(obj: any): number;
    function throttle(fn: () => void, time: number, context: any): () => void;
    function wrapNum(num: number, range: number[], includeMax?: boolean): number;
    function falseFn(): false;
    function formatNum(num: number, digits?: number): number;
    function trim(str: string): string;
    function splitWords(str: string): string[];
    function setOptions(obj: any, options: any): any;
    function getParamString(obj: any, existingUrl?: string, uppercase?: boolean): string;
    function template(str: string, data: any): string;
    function isArray(obj: any): boolean;
    function indexOf(array: any[], el: any): number;
    function requestAnimFrame(fn: (timestamp: number) => void, context?: any, immediate?: boolean): number;
    function cancelAnimFrame(id: number): void;

    let lastId: number;
    let emptyImageUrl: string;
  }

  export function setOptions(thisArgument: any, opts: any): unknown;

  export class MultiPolygon extends Polygon {}

  export type DistanceProp = {
    distance: number;
    finalBearing: number;
    initialBearing: number;
  };

  export class Geodesic extends Polyline {
    constructor(
      latlngs: LatLngExpression[] | LatLngExpression[][],
      options?: PolylineOptions & { steps: number; wrap: boolean },
    );
    getLatLngs(): LatLng[][];
    _vincenty_inverse(p1: LatLng, p2: LatLng): DistanceProp;
    _rings: L.Point[][];
    _projectLatlngs(ll: LatLng[], point: L.Point[][], bnds: Bounds): void;
    _renderer: {
      _container: SVGSVGElement;
    };
  }

  /** A constant that represents the Leaflet version in use. */
  export const version: string;
}

/* eslint-enable */
