import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native'

import Layout from './components/Layout'
import Timer from './components/Timer'

const App = () => {
	const timerWarningColor = 'red'
	const timers = [
		{
			type: 'work',
			title: 'Travail',
			timeInSec: 20 * 60,
			warningTime: 20,
			color: '#8a3df5',
		},
		{
			type: 'break',
			title: 'Pause',
			timeInSec: 10 * 60,
			warningTime:20,
			color: '#1dde97',
		}
	]

	const [timer, setTimer] = useState(timers[0])
	const [timeLeft, setTimeLeft] = useState(timers[0].timeInSec)
	const [currentColor, setCurrentColor] = useState(timers[0].color)
	const [isPaused, setIsPaused] = useState(false)
	const [isRunning, setIsRunning] = useState(false)

	const [workTimeInSec, setWorkTimeInSec] = useState(timers[0].timeInSec)
	const [breakTimeInSec, setBreakTimeInSec] = useState(timers[1].timeInSec)

	const onTimeEnd = () => {
		const newTimer = timers[timer.type === 'break' ? 0 : 1]
		const newTimeInSec = newTimer.type === 'break' ? getValidValue(breakTimeInSec) : getValidValue(workTimeInSec)

		setTimer(newTimer)
		setTimeLeft(newTimeInSec)
		setCurrentColor(newTimer.warningTime < newTimeInSec ? newTimer.color : timerWarningColor)
	}

	const switchIsOnBreak = () => {
		isRunning ? setIsPaused(!isPaused) : setIsRunning(true)
	}

	const onChangeText = (text, type) => {
		const value = toInt(text) || null
		if (type === 'work') {
			setWorkTimeInSec(value)
			if (!isRunning) setTimeLeft(getValidValue(value))
		}
		else if (type === 'break') {
			setBreakTimeInSec(value)
		}
	}

	const onEndEditing = (text, type) => {
		const value = toInt(text) || null
		
		if (type === 'work') {
			setWorkTimeInSec(getValidValue(value))
			if (!isRunning) setTimeLeft(getValidValue(value))
		}
		else if (type === 'break') {
			setBreakTimeInSec(getValidValue(value))
		}
	}

	const getValidValue = (value) => {
		const isValid = !!value && value >= 5
		return isValid ? value : 5
	}

	const resetTimer = () => {
		setTimer({...timers[0]})
		setTimeLeft(new Number(timers[0].timeInSec))
		setCurrentColor(timers[0].warningTime < timers[0].timeInSec ? timers[0].color : timerWarningColor)
		setIsRunning(false)
		setIsPaused(false)
		setWorkTimeInSec(timers[0].timeInSec)
		setBreakTimeInSec(timers[1].timeInSec)
	}

	const toInt = (string) => {
		return Number.parseInt(string.replace(/[^\d]*/, ''))
	}

	return (
		<Layout style={{ backgroundColor: currentColor }}>
			<View style={styles.timerContainer}>
				<Text style={styles.timerTitle}>{ timer.title }</Text>
				<Timer
					timeInSec={timeLeft}
					warningTime={timer.warningTime}
					onTimeEnd={onTimeEnd}
					onEnterWarning={() => setCurrentColor(timerWarningColor)}
					isPaused={!isRunning || isPaused}
				/>
			</View>

			<View style={styles.controlsContainer}>
				<TouchableOpacity
					style={styles.controlButton}
					onPress={switchIsOnBreak}
				>
					<Text style={styles.controlButtonText}>
						{ isRunning ? (isPaused ? 'Continuer' : 'Pause') : 'Démarrer' }
					</Text>
				</TouchableOpacity>
				
				<TouchableOpacity
					style={styles.controlButton}
					onPress={resetTimer}
				>
					<Text style={styles.controlButtonText}>
						Réinitialiser
					</Text>
				</TouchableOpacity>
			</View>
			
			<View style={styles.settingsContainer}>
				<Text style={styles.sectionTitle}>Paramètres</Text>

				<Text style={styles.inputLabel}>Durée de travail (secondes)</Text>
				<TextInput
					style={styles.timeInput}
					keyboardType='numeric'
					onChangeText={text => onChangeText(text, 'work')}
					onEndEditing={event => onEndEditing(event.nativeEvent.text, 'work')}
					value={workTimeInSec?.toString()}
				/>

				<Text style={styles.inputLabel}>Durée de pause (secondes)</Text>
				<TextInput
					style={styles.timeInput}
					keyboardType='numeric'
					onChangeText={text => onChangeText(text, 'break')}
					onEndEditing={event => onEndEditing(event.nativeEvent.text, 'break')}
					value={breakTimeInSec?.toString()}
				/>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	timerContainer: {
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 40
	},

	timerTitle: {
		fontSize: 24,
		color: 'white'
	},

	controlButton: {
		paddingHorizontal: 30,
		paddingVertical: 20,
		backgroundColor: 'white',
		borderRadius: 4,
		marginBottom: 10
	},

	controlButtonText: {
		color: 'black',
		fontSize: 18,
		textAlign: 'center',
		textTransform: 'uppercase'
	},

	settingsContainer: {
		flex: 1,
		marginTop: 20
	},

	sectionTitle: {
		fontSize: 22,
		color: 'white',
		textAlign: 'center',
		marginBottom: 10
	},

	inputLabel: {
		fontSize: 18,
		color: 'white',
		marginBottom: 5
	},

	timeInput: {
		backgroundColor: 'white',
		color: 'black',
		paddingHorizontal: 30,
		paddingVertical: 20,
		fontSize: 18,
		marginBottom: 10
	}
})

export default App