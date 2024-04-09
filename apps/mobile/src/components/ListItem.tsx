import React from 'react'
import { StyleSheet } from 'react-native'
import { List, ListIconProps } from 'react-native-paper'

const ListItem: React.FC<{
	icon?: ListIconProps['icon']
	title: string
	onPress?: () => void
}> = ({ icon = 'folder', title, onPress = () => {} }) => {
	return (
		<List.Item
			title={title}
			left={(props) => <List.Icon {...props} icon={icon} />}
			right={(props) => <List.Icon {...props} icon='chevron-right' />}
			onPress={onPress}
			style={styles.listItem}
		/>
	)
}

const styles = StyleSheet.create({
	listItem: {
		marginVertical: 5,
		borderColor: '#E0E0E0', // use theme colors
		borderWidth: 1,
		borderRadius: 5
	}
})

export default ListItem
