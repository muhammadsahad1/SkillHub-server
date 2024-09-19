import { Stripe } from 'stripe';
export interface IStripeService {
    createCheckoutSession(price: number, eventId: string, useId: string): Promise<string>;
    createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent>;
}
export declare class StripeService implements IStripeService {
    private stripe;
    constructor(stripeSecretKey: string);
    createCheckoutSession(price: number, eventId: string, userId: string): Promise<string>;
    createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent>;
}
