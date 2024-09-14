import { Stripe } from 'stripe';
export class StripeService {
    stripe;
    constructor(stripeSecretKey) {
        this.stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2024-06-20',
        });
    }
    async createCheckoutSession(price, eventId, userId) {
        console.log("eventId ==<", eventId, "UserId", userId);
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Event Registration',
                        },
                        unit_amount: price * 100, // amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/auth/event/registered/success?session_id={CHECKOUT_SESSION_ID}&event_id=${eventId}&userId=${userId}`,
            cancel_url: 'https://localhost:5173/auth/event/cancel',
        });
        console.log('sesion ==>', session);
        return session.id;
    }
    async createPaymentIntent(amount) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amount * 100, // amount in cents
            currency: 'usd',
        });
        return paymentIntent; // Return the PaymentIntent object
    }
}
