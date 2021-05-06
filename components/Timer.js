import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Timer = (props) => {
	const [timeInSec, setTimeInSec] = useState(props.timeInSec)
	
	let interval = null

	useEffect(() => {
		if (!props.isPaused) {
			interval = setInterval(() => {
				const newTime = timeInSec - 1

				setTimeInSec(newTime)

				if (newTime === 0) {
					clearInterval(interval)
				}

				triggerTimeEvent(newTime)
			}, 1000)

			return () => clearInterval(interval)
		}
	})

	useEffect(() => {
		if (props.isPaused) {
			clearInterval(interval)
		}
	}, [props.isPaused])

	useEffect(() => {
		setTimeInSec(props.timeInSec)
	}, [props.timeInSec])

	const triggerTimeEvent = (time) => {
		if (time === props.warningTime && typeof props.onEnterWarning === 'function') {
			props.onEnterWarning()
		}
		
		if (time === 0 && typeof props.onTimeEnd === 'function') {
			props.onTimeEnd()
		}
	}

	return (
		<View>
			<Text style={styles.time}>
				{ formatTime(timeInSec) }
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	time: {
		fontSize: 56,
		fontFamily: 'sans-serif-light',
		color: 'white'
	}
})

const formatTime = (secondsTotal) => {
	const minutes = Math.floor(secondsTotal / 60)
	const seconds = secondsTotal - (minutes * 60)

	const minutesString = `${minutes}`
	const secondsString = `${seconds}`

	const minutesFormatted = minutesString.length === 1 ? `0${minutes}` : minutesString
	const secondsFormatted = secondsString.length === 1 ? `0${seconds}` : secondsString

	return `${minutesFormatted}:${secondsFormatted}`
}

export default Timer