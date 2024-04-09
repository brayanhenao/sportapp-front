import React, { useState, useEffect } from 'react'
import { Icon } from 'react-native-paper'

import { Tabs, useSegments } from 'expo-router'

const ProfileIcon = ({ color }) => (
	<Icon size={20} source='account' color={color} />
)
const TrainingIcon = ({ color }) => (
	<Icon size={20} source='heart' color={color} />
)

const NotificationsIcon = ({ color }) => (
	<Icon size={20} source='bell' color={color} />
)

const PremiumIcon = ({ color }) => (
	<Icon size={20} source='star' color={color} />
)

export default function TabLayout() {
	const [showHeader, setShowHeader] = useState(true)

	const segments = useSegments()

	useEffect(() => {
		if (segments?.length > 3) {
			setShowHeader(false)
		} else {
			setShowHeader(true)
		}
	}, [segments])

	return (
		<Tabs
			screenOptions={{
				headerShown: showHeader,
				headerTitleAlign: 'left',
				headerTransparent: true,
				headerTitleStyle: {
					fontWeight: 'normal',
					fontSize: 34
				}
			}}>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Perfil',
					tabBarIcon: ProfileIcon
				}}
			/>
			<Tabs.Screen
				name='training'
				options={{
					title: 'Entrenamiento',
					tabBarIcon: TrainingIcon
				}}
			/>
			<Tabs.Screen
				name='notifications'
				options={{
					title: 'Notificaciones',
					tabBarIcon: NotificationsIcon
				}}
			/>
			<Tabs.Screen
				name='premium'
				options={{
					title: 'Preferenciales',
					tabBarIcon: PremiumIcon
				}}
			/>
		</Tabs>
	)
}
