import React from "react"
import { useTranslation } from "react-i18next"
import { EmptyState as EmptyStateMolecule } from "@molecules/EmptyState"

export const EmptyState = React.memo(() => {
    const { t } = useTranslation()

    return <EmptyStateMolecule text={t('carDetails.carNotFound')} />
})

