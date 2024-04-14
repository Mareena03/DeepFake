import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components"

const VideoCont=styled.div`
background-color:"black"`;

export default function VideoComp(){

const [predictionResult,setPredictionResult]=useState(null)
useEffect(()=>{
    fetch("http://localhost:8000/data")
    .then(res => res.json())
    .then(data => {
    setPredictionResult(data.details); // Assuming data.details contains the prediction result
})
.catch(error => console.error('Error fetching prediction result:', error));
},[predictionResult])

    return(
        <VideoCont>
            <h2>{predictionResult}</h2>
        </VideoCont>
    )
}