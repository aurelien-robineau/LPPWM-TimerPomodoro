import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'

const Header = () => {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>Timer Pomodoro</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		paddingTop: StatusBar.currentHeight + 25,
		paddingBottom: 25
	},

	title: {
		fontSize: 26,
		color: "white"
	}
})

export default Header