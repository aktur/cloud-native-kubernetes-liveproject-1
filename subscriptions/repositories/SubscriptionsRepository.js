const domain = require('../domain/Subscription')

let subscriptionKey = "subscription"

class SubscriptionsRepository {
    constructor(client) {
        this.client = client
    }

    async addOrReplaceSubscription(subscription) {

        let len = await this.client.hlen(subscriptionKey)
        
        if(len > 0) {
            // If there is already an existing payment method, we're
            // going to replace that. Remove the old one first just
            // to make sure.
            await this.removeSubscription()
        }

        const data = this.transformToRepositoryFormat(subscription)
        await this.client.hmset(subscriptionKey, data)
    }

    async getSubscription() {
        let len = await this.client.hlen(subscriptionKey)
        
        if(len <= 0) {
            return null
        }

        const data = await this.client.hgetall(subscriptionKey)
        return this.transformToDomainFormat(data)
    }

    async removeSubscription() {
        let len = await this.client.hlen(subscriptionKey)
        
        if(len <= 0) {
            // If there is already an existing payment method, we're
            // going to replace that. Remove the old one first just
            // to make sure.
            return
        }

        let fields = await this.client.hkeys(subscriptionKey)
        return await this.client.hdel(subscriptionKey, fields)
    }

    // This method will transform a domain representation to its
    // corresponding repository representation.
    transformToRepositoryFormat(subscription) {

        return {
            "product": subscription.product,
            "monthsPurchased": subscription.monthsPurchased,
            "status": subscription.status,
            "datePurchased": subscription.datePurchased
        }
    }

    // This method will transform a repository representation to its
    // corresponding domain representation.
    transformToDomainFormat(data) {

        const {product, monthsPurchased, datePurchased, status} = data

        return new domain.Subscription(product, monthsPurchased, datePurchased, status)
    }
}

module.exports = (client) => new SubscriptionsRepository(client)
