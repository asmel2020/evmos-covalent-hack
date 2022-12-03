import React, { useState } from 'react'
import { ActivityIndicator, Animated, ImageStyle, StyleProp, View } from 'react-native'
import { useAnimation } from '../../hook/useAnimation';


interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} } : Props) => {

    const { opacity, fadeIn } = useAnimation();
    const [ isLoading, setIsLoading ] = useState( true );

    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    }

    return (
        <>
            {
                isLoading && 
                    <ActivityIndicator 
                        style={{ position: 'absolute', top:"39%",left:"39%" }} 
                        color="#5856D6" 
                        size={ 30 }
                       
                    />
            }

            <Animated.Image 
                source={{ uri }}
                onLoadEnd={ finishLoading }
                style={{
                    ...style as any,
                    opacity
                }}
            />
        </>
    )
}