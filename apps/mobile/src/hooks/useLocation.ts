import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const startLocationUpdates = async (
	setIsLocationAvailable: React.Dispatch<React.SetStateAction<boolean>>,
	setLocationUpdates: React.Dispatch<
		React.SetStateAction<Location.LocationObject[]>
	>
) => {
	try {
		let { status } = await Location.requestForegroundPermissionsAsync()
		const { status: backgroundStatus } =
			await Location.requestBackgroundPermissionsAsync()
		if (status !== 'granted' || backgroundStatus !== 'granted') {
			setIsLocationAvailable(false)
			return
		}

		setIsLocationAvailable(true)
		await Location.startLocationUpdatesAsync('locationUpdates', {
			accuracy: Location.Accuracy.High,
			timeInterval: 1000,
			distanceInterval: 1,
			foregroundService: {
				notificationTitle: 'Location',
				notificationBody: 'Location updates are running',
				notificationColor: '#ff0000'
			}
		})

		Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				timeInterval: 1000
			},
			(location) => {
				setLocationUpdates((prevLocations) => [
					...prevLocations,
					location
				])
			}
		)
	} catch (error) {
		console.error('Error starting location updates', error) // eslint-disable-line no-console
		setIsLocationAvailable(false)
	}
}

const stopLocationUpdates = async () => {
	await Location.stopLocationUpdatesAsync('locationUpdates')
}

export const useLocation = () => {
	const [locationUpdates, setLocationUpdates] = useState<
		Location.LocationObject[]
	>([])
	const [isLocationAvailable, setIsLocationAvailable] = useState(false)

	useEffect(() => {
		let isMounted = true

		if (isMounted) {
			startLocationUpdates(setIsLocationAvailable, setLocationUpdates)
		}

		return () => {
			isMounted = false
			stopLocationUpdates()
		}
	}, [])

	return { locationUpdates, isLocationAvailable }
}
