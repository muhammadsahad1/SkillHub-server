import axios, { AxiosInstance } from "axios";

export interface IZoomService {
  getZoomAccessToken(): Promise<string | undefined>;
  createMeeting(
    accessToken: string,
    meetingDetails: IZoomMeetingDetails
  ): Promise<IZoomMeetingResponse | undefined>;
}

interface IZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface IZoomMeetingDetails {
  topic: string;
  type: number;
  start_time?: string; // ISO 8601 format: "2024-08-29T10:00:00Z"
  duration?: number; // In minutes
  timezone?: string;
}

interface IZoomMeetingResponse {
  id: string;
  join_url: string;
  start_url: string;
}

export class ZoomService implements IZoomService {
  private axiosInstance: AxiosInstance;
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;

  constructor(clientId: string, clientSecret: string, baseUrl: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async getZoomAccessToken(): Promise<string | undefined> {
    try {
      const response = await this.axiosInstance.post<IZoomTokenResponse>(
        "/oauth/token",
        new URLSearchParams({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${this.clientId}:${this.clientSecret}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("res ===>", response.data.access_token);
      return response.data.access_token;
    } catch (error: any) {
      console.error(
        "Error getting Zoom access token:",
        error.response?.data || error.message
      );
      return undefined;
    }
  }

  public async createMeeting(
    accessToken: string,
    meetingDetails: IZoomMeetingDetails
  ): Promise<IZoomMeetingResponse | undefined> {
    try {
      console.log("Access Token:", accessToken);
    console.log("Meeting Details:", meetingDetails);

      const response = await this.axiosInstance.post<IZoomMeetingResponse>(
        "/v2/users/me/meetings",
        meetingDetails,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response ==>", response);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating Zoom meeting:",
        error.response?.data || error.message
      );
      return undefined;
    }
  }
}
