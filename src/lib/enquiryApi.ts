import { API_BASE_URL } from "./adminAuth";

export interface EnquiryPayload {
  fullName: string;
  company?: string;
  email: string;
  mobile: string;
  sourceLocation?: string;
  destinationLocation?: string;
  shipmentWeight?: string;
  enquiryType?: string;
  message: string;
}

export interface EnquiryData extends EnquiryPayload {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface EnquiryResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data?: EnquiryData;
}

export async function submitEnquiryApi(payload: EnquiryPayload): Promise<EnquiryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: payload.fullName.trim(),
        company: (payload.company || "").trim(),
        email: payload.email.trim(),
        mobile: payload.mobile.trim(),
        sourceLocation: (payload.sourceLocation || "").trim(),
        destinationLocation: (payload.destinationLocation || "").trim(),
        shipmentWeight: (payload.shipmentWeight || "").trim(),
        enquiryType: (payload.enquiryType || "Website Enquiry").trim(),
        message: payload.message.trim(),
      }),
    });

    const data: EnquiryResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Submit Enquiry API Error:", error);
    return {
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to submit enquiry. Please check your network connection and try again.",
    };
  }
}
