import React, { useState, useEffect, useCallback } from 'react'

import { View, Text, StyleSheet } from 'react-native'

import { IconButton } from 'react-native-paper'

import TimeRing from '@/components/TimerRing'
import { usePedometer } from '@/hooks/usePedometer'
import { useLocation } from '@/hooks/useLocation'
import { useAuthStore } from '@sportapp/stores'

const TrainingSession: React.FC = () => {
	const { registerTrainingSession } = useAuthStore()

	const { isPedometerAvailable, currentStepCount } = usePedometer()
	const { locationUpdates, isLocationAvailable } = useLocation()

	const [currentTime, setCurrentTime] = useState(0)
	const [maxTime] = useState(60)

	const [startedAt, setStartedAt] = useState<Date>(new Date())

	const [isRunning, setIsRunning] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
		null
	)

	const startTimer = () => {
		const currentTimer = setInterval(() => {
			setCurrentTime(currentTime + 1)
		}, 1000)
		setTimer(currentTimer)
	}

	const handleStart = () => {
		setCurrentTime(0)
		setIsRunning(true)
		setIsPaused(false)
		setStartedAt(new Date())
		startTimer()
	}

	const handlePause = () => {
		setIsPaused(true)
		if (timer) {
			clearInterval(timer)
		}
	}

	const handleContinue = () => {
		setIsPaused(false)
		startTimer()
	}

	const handleStop = useCallback(() => {
		if (timer) {
			clearInterval(timer)
		}
		setCurrentTime(0)
		setIsRunning(false)

		const payload = {
			startedAt,
			duration: currentTime
		}

		if (isLocationAvailable) {
			payload.locations = locationUpdates
		}
		if (isPedometerAvailable) {
			payload.steps = currentStepCount
		}
		registerTrainingSession(payload as any)

		console.log(payload)
	}, [
		timer,
		currentTime,
		startedAt,
		isLocationAvailable,
		locationUpdates,
		isPedometerAvailable,
		currentStepCount,
		registerTrainingSession
	])

	useEffect(() => {
		if (currentTime >= maxTime) {
			handleStop()
		}
	}, [currentTime, maxTime, handleStop])

	return (
		<View style={styles.container}>
			<TimeRing currentTime={currentTime} maxTime={maxTime} />
			<View style={styles.actionsContainer}>
				{!isRunning && (
					<View style={styles.button}>
						<IconButton
							size={36}
							icon='play'
							mode='contained'
							onPress={handleStart}
						/>
						<Text>Iniciar</Text>
					</View>
				)}
				{isRunning && !isPaused && (
					<View style={styles.button}>
						<IconButton
							size={36}
							icon='pause'
							mode='contained'
							onPress={handlePause}
						/>
						<Text>Pausar</Text>
					</View>
				)}
				{isRunning && isPaused && (
					<View style={styles.button}>
						<IconButton
							size={36}
							icon='play'
							mode='contained'
							onPress={handleContinue}
						/>
						<Text>Reanudar</Text>
					</View>
				)}
				{isRunning && (
					<View style={styles.button}>
						<IconButton
							size={36}
							icon='stop'
							mode='contained'
							onPress={handleStop}
						/>
						<Text>Parar</Text>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 40
	},
	button: {
		alignItems: 'center'
	}
})

export default TrainingSession
