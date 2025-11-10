import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function ({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    logger.info("Fetching all API keys...")

    const apiKeyModule = container.resolve(Modules.API_KEY)

    const apiKeys = await apiKeyModule.listApiKeys({
      type: "publishable"
    })

    logger.info("\n")
    logger.info("========================================")
    logger.info("PUBLISHABLE API KEYS:")
    logger.info("========================================")

    if (apiKeys.length === 0) {
      logger.info("No publishable API keys found!")
    } else {
      apiKeys.forEach((key: any) => {
        logger.info(`Title: ${key.title}`)
        logger.info(`Token: ${key.token}`)
        logger.info(`Created: ${key.created_at}`)
        logger.info("---")
      })
    }

    logger.info("========================================")
    logger.info("\n")

  } catch (error) {
    logger.error("Error fetching API keys:", error)
    throw error
  }
}
