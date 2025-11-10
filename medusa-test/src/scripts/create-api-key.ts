import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createApiKeysWorkflow } from "@medusajs/medusa/core-flows"

export default async function ({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    logger.info("Creating publishable API key...")

    const { result: publishableApiKeyResult } = await createApiKeysWorkflow(
      container
    ).run({
      input: {
        api_keys: [
          {
            title: "Webshop",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    })

    const publishableApiKey = publishableApiKeyResult[0]

    logger.info("\n")
    logger.info("========================================")
    logger.info("PUBLISHABLE API KEY CREATED:")
    logger.info(publishableApiKey.token)
    logger.info("========================================")
    logger.info("\n")
    logger.info("Copy this key and use it as NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY")

  } catch (error) {
    logger.error("Error creating API key:", error)
    throw error
  }
}
