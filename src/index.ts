import fetch from "node-fetch";

// --- Schemas ---

/**
 * Represents an amusement park.
 */
export interface Park {
  id?: string; // Optional ID, as shown in the API example.
  name: string;
  land: string;
}

/**
 * Represents the opening times of a theme park.
 */
export interface OpeningTimes {
  opened_today: boolean;
  open_from: string; // ISO 8601 date-time string (e.g. "2024-08-12T09:00:00+02:00")
  closed_from: string; // ISO 8601 date-time string
}

/**
 * Allowed waiting statuses.
 */
export type WaitingStatus =
  | "opened"
  | "virtualqueue"
  | "maintenance"
  | "closedice"
  | "closedweather"
  | "closed";

/**
 * Represents the waiting times for an attraction.
 */
export interface WaitingTimes {
  datetime: string; // ISO 8601 date-time string
  date: string;     // ISO 8601 date string
  time: string;     // ISO 8601 time string
  code: string;
  waitingtime: number;
  status: WaitingStatus;
  name: string;
}

// --- Request Header Interfaces ---

/**
 * Request headers for the GET /v1/parks endpoint.
 */
export interface ParksRequestHeaders {
  language: "de" | "en";
}

/**
 * Request headers for the GET /v1/openingtimes endpoint.
 */
export interface OpeningtimesRequestHeaders {
  park: string;
}

/**
 * Request headers for the GET /v1/waitingtimes endpoint.
 */
export interface WaitingTimesRequestHeaders {
  park: string;
  language: "de" | "en";
}

// --- Response Types ---

export type GetParksResponse = Park[];
export type GetOpeningtimesResponse = OpeningTimes[];
export type GetWaitingtimesResponse = WaitingTimes[];

// --- API Interface ---

/**
 * Describes the Wartezeiten.APP / Waitingtimes.APP API.
 */
export interface WartezeitenAPI {
  /**
   * GET /v1/parks
   * Retrieves available theme parks.
   */
  getParks(
    headers: ParksRequestHeaders
  ): Promise<GetParksResponse>;

  /**
   * GET /v1/openingtimes
   * Retrieves the opening times of the theme parks.
   */
  getOpeningtimes(
    headers: OpeningtimesRequestHeaders
  ): Promise<GetOpeningtimesResponse>;

  /**
   * GET /v1/waitingtimes
   * Retrieves current queue times.
   */
  getWaitingtimes(
    headers: WaitingTimesRequestHeaders
  ): Promise<GetWaitingtimesResponse>;
}

// --- Client Options Interface ---

export interface WartezeitenAPIClientOptions {
  baseUrl?: string;
}

// --- API Client Implementation ---

/**
 * A client for interacting with the Wartezeiten.APP / Waitingtimes.APP API.
 */
export class WartezeitenAPIClient implements WartezeitenAPI {
  private baseUrl: string;

  constructor(options?: WartezeitenAPIClientOptions) {
    this.baseUrl = options?.baseUrl || "https://api.wartezeiten.app";
  }

  /**
   * Internal helper to perform an HTTP GET request and parse the JSON response.
   */
  private async fetchJSON<T>(
    endpoint: string,
    headers: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: "GET",
      headers
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${text}`
      );
    }

    return response.json() as Promise<T>;
  }

  async getParks(
    headers: ParksRequestHeaders
  ): Promise<GetParksResponse> {
    const fetchHeaders: Record<string, string> = {
      language: headers.language
    };

    return this.fetchJSON<GetParksResponse>("/v1/parks", fetchHeaders);
  }

  async getOpeningtimes(
    headers: OpeningtimesRequestHeaders
  ): Promise<GetOpeningtimesResponse> {
    const fetchHeaders: Record<string, string> = {
      park: headers.park
    };

    return this.fetchJSON<GetOpeningtimesResponse>(
      "/v1/openingtimes",
      fetchHeaders
    );
  }

  async getWaitingtimes(
    headers: WaitingTimesRequestHeaders
  ): Promise<GetWaitingtimesResponse> {
    const fetchHeaders: Record<string, string> = {
      park: headers.park,
      language: headers.language
    };

    return this.fetchJSON<GetWaitingtimesResponse>(
      "/v1/waitingtimes",
      fetchHeaders
    );
  }
}

// --- Optional Default Export ---
export default WartezeitenAPIClient;
