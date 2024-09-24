"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const stripe_1 = require("stripe");
class StripeService {
    constructor(stripeSecretKey) {
        this.stripe = new stripe_1.Stripe(stripeSecretKey, {
            apiVersion: '2024-06-20',
        });
    }
    createCheckoutSession(price, eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("eventId ==<", eventId, "UserId", userId);
            const session = yield this.stripe.checkout.sessions.create({
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
                success_url: `https://skill-hub-share-platform.vercel.app/auth/event/registered/success?session_id={CHECKOUT_SESSION_ID}&event_id=${eventId}&userId=${userId}`,
                cancel_url: 'https://localhost:5173/auth/event/cancel',
            });
            console.log('sesion ==>', session);
            return session.id;
        });
    }
    createPaymentIntent(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentIntent = yield this.stripe.paymentIntents.create({
                amount: amount * 100, // amount in cents
                currency: 'usd',
            });
            return paymentIntent; // Return the PaymentIntent object
        });
    }
}
exports.StripeService = StripeService;
