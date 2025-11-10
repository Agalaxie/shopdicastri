import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { linkSalesChannelsToApiKeyWorkflow } from "@medusajs/medusa/core-flows"

export default async function ({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    logger.info("Linking publishable API key to sales channel...")

    // Get the publishable API key
    const apiKeyModule = container.resolve(Modules.API_KEY)
    const apiKeys = await apiKeyModule.listApiKeys({
      type: "publishable"
    })

    if (apiKeys.length === 0) {
      logger.error("No publishable API key found!")
      return
    }

    const publishableApiKey = apiKeys[0]
    logger.info(`Found API key: ${publishableApiKey.title} (${publishableApiKey.token})`)

    // Get the default sales channel
    const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)
    const salesChannels = await salesChannelModule.listSalesChannels({
      is_disabled: false
    })

    if (salesChannels.length === 0) {
      logger.error("No sales channel found!")
      return
    }

    const defaultSalesChannel = salesChannels[0]
    logger.info(`Found sales channel: ${defaultSalesChannel.name}`)

    // Link them together
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: {
        id: publishableApiKey.id,
        add: [defaultSalesChannel.id],
      },
    })

    logger.info("\n")
    logger.info("========================================")
    logger.info("SUCCESS!")
    logger.info(`API key "${publishableApiKey.title}" linked to sales channel "${defaultSalesChannel.name}"`)
    logger.info("========================================")
    logger.info("\n")

  } catch (error) {
    logger.error("Error linking API key to sales channel:", error)
    throw error
  }
}
