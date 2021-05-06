import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './Header'

const Layout = (props) => {
  return (
	  <View style={{ ...styles.layout, ...props.style }}>
			<Header />
			{props.children}
	  </View>
  )
}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		paddingHorizontal: 30
	}
})

export default Layout