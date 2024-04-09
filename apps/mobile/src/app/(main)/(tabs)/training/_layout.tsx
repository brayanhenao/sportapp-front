import React, { ComponentProps } from 'react'
import { View, StyleSheet } from 'react-native'
import { Stack } from 'expo-router/stack'
import { router } from 'expo-router'

import { IconButton, Text } from 'react-native-paper'

export default function TrainingStack() {
	const screenOptions: ComponentProps<typeof Stack.Screen>['options'] = {
		headerTransparent: true,

		header: ({ back, options }) => (
			<View style={styles.header}>
				{back && (
					<IconButton
						icon='chevron-left'
						size={35}
						onPress={() => router.back()}
					/>
				)}
				<Text
					variant='displaySmall'
					style={styles.headerTitle}
					numberOfLines={1}
					ellipsizeMode='tail'>
					{options.title}
				</Text>
			</View>
		)
	}
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ ...screenOptions, headerShown: false }}
			/>
			<Stack.Screen
				name='trainingSession'
				options={{ ...screenOptions, title: 'Iniciar Entrenamiento' }}
			/>
		</Stack>
	)
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 45,
		gap: 5
	},
	headerTitle: {
		flex: 1,
		fontSize: 34,
		fontWeight: 'normal',
		height: 50,
		maxWidth: '70%'
	}
})
