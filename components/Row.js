import { Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Row({item, deleteTask}) {
    
    const handlePress = () => {
        deleteTask(item.id);
    }

    return (
        <Pressable onPress={handlePress}>
            <Text style={styles.row}>
                {item.name}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        fontsize: 16,
        padding: 4,
        margin: 4,
        marginHorizontal: 20
    }
})