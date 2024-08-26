import { Card } from 'react-bootstrap';
import style from './style.module.css';
import { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';
import he from 'he';

export function TextCard({
  title,
  subtitle,
  content,
  onCardClick,
  onTrashClick,
}) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTrashHovered, setIsTrashHovered] = useState(false);

  function onTrashClickStopPropagation(e) {
    onTrashClick();
    e.stopPropagation();
  }

  const decodedTitle = he.decode(title);
  const decodedContent = he.decode(content);

  return (
    <Card
      onClick={onCardClick}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={{ borderColor: isCardHovered ? '#0d6efd' : 'transparent' }}
      className={style.card}
    >
      <Card.Body>
        <div className={style.header}>
          <Card.Title className='text-break'>{decodedTitle}</Card.Title>
          <Trash
            size={20}
            onClick={onTrashClickStopPropagation}
            onMouseEnter={() => setIsTrashHovered(true)}
            onMouseLeave={() => setIsTrashHovered(false)}
            style={{
              color: isTrashHovered ? '#FF7373' : '#b8b8b8',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          />
        </div>
        <Card.Subtitle className='mb-2 text-muted'>{subtitle}</Card.Subtitle>
        <Card.Text className={style.content}>{decodedContent}</Card.Text>
      </Card.Body>
    </Card>
  );
}
