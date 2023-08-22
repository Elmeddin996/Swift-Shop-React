import React from 'react'
import { Paper, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import './style.scss'

export const Slider:React.FC = () => {
  const items = [
    {
      title: 'Slide 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Slide 2',
      content: 'Nullam pulvinar, lectus vel gravida venenatis, arcu. l',
    },
    {
      title: 'Slide 3',
      content: 'Integer laoreet, dui id fermentum fermentum, nisi.',
    },
  ];
  return (
    <><Carousel className='carousel-main'>
    {items.map((item, index) => (
      <Paper key={index} elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5">{item.title}</Typography>
        <Typography>{item.content}</Typography>
      </Paper>
    ))}
  </Carousel></>
  )
}
