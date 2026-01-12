import React, { useEffect, useState } from 'react'
import { Card, Spinner, Stack, Text, Flex, Box } from '@sanity/ui'
import { useClient } from 'sanity'

export function VideoPreview(props) {
    const client = useClient({ apiVersion: '2023-05-03' })
    const [videoUrl, setVideoUrl] = useState(null)
    const [loading, setLoading] = useState(true)

    // In components.preview, if prepare is used, we get those fields
    // We selected asset as 'media' in prepare
    const assetRef = props.media?._ref || props.asset?._ref

    useEffect(() => {
        if (!assetRef) {
            setLoading(false)
            return
        }

        // Fetch the actual asset document to get the URL
        client.fetch(`*[_id == $assetId][0]{ url }`, { assetId: assetRef })
            .then((asset) => {
                if (asset?.url) {
                    setVideoUrl(asset.url)
                }
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching video asset:', error)
                setLoading(false)
            })
    }, [assetRef, client])

    // To match Sanity's default look and get the 3-dots menu back,
    // we use renderDefault to render the standard preview row,
    // but we pass media: null to it because we want to render the video larger below it.
    return (
        <Stack space={0}>
            {/* Standard Sanity Preview Row (Title, Menu, etc.) */}
            <Box paddingY={2}>
                {props.renderDefault({ ...props, media: null })}
            </Box>

            {/* Large Video Player Area */}
            <Card
                radius={2}
                shadow={1}
                border
                overflow="hidden"
                bg="black"
                marginTop={1}
            >
                {loading ? (
                    <Flex align="center" justify="center" style={{ height: '200px' }}>
                        <Spinner />
                    </Flex>
                ) : videoUrl ? (
                    <video
                        src={videoUrl}
                        controls
                        style={{
                            width: '100%',
                            display: 'block',
                            maxHeight: '600px',
                            backgroundColor: '#000'
                        }}
                        preload="metadata"
                    />
                ) : (
                    <Flex align="center" justify="center" padding={4}>
                        <Text muted size={1}>No video uploaded or asset not found</Text>
                    </Flex>
                )}
            </Card>
        </Stack>
    )
}
