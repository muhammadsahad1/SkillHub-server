import { IStripeService } from "../../../framework/service/stripService";
import { Next } from "../../../framework/types/serverPackageType";
export declare const makePayment: (stripService: IStripeService, eventPrice: string, eventId: string, userId: string, next: Next) => Promise<string | void>;
