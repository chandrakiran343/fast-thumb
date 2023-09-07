import { createStyles, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconCheck, IconX } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    // border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    //   }`,
    // padding: `10px`,
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    // marginBottom: theme.spacing.sm,
    touchAction: 'none',
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
    backgroundColor: "red"
  },

}));

interface DndListProps {
  data: {
    // symbol: string;
    answerPosition: number;
    name: string;
  }[];
  time: number;
  submitted: boolean;
  setScore: any,
  question: number,
  start: boolean
}

export function DndList({ data, time, submitted, question, start, setScore }: DndListProps) {
  const { classes, cx } = useStyles();
  // const [stateData, setStateData] = useState<any>(data)
  const [state, handlers] = useListState(data);

  const rightAnswer = [...data]

  const rightOptions = rightAnswer.sort((a, b) => a.answerPosition - b.answerPosition)

  question
  // let localQuestion = 

  const evaluate = () => {
    let score = 0;
    state?.forEach((item: any, index) => {
      if (item.answerPosition === index + 1) {
        score += 1;
      }
    });
    // set up scoring where low time = high score
    return score;
  };

  useEffect(() => {
    handlers.setState(data)
  }, [data])

  useEffect(() => {
    let score = evaluate();
    console.log(state)
    let time_penalty = Math.floor((45 / (45 - time + 1))) * score
    score += time_penalty
    score = Math.max(score, 0)
    if (question === 0) {
      score = 0
    }
    setScore(score)
    console.log(rightOptions)
  }, [state, submitted])

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div className='w-full flex justify-center'>
            <div className='md:w-[40%] w-[90%]' {...provided.droppableProps} ref={provided.innerRef}>
              {state?.map((item, index) => {
                return (
                  <Draggable isDragDisabled={(time === 0 || submitted || !start) ? true : false} key={item.name} index={index} draggableId={item.name}>
                    {(provided, snapshot) => (
                      <div
                        className={cx("bg-chefchaouen_blue", "flex justify-center p-2 mb-2", classes.item, {
                          [classes.itemDragging]: snapshot.isDragging,
                          ["bg-rose"]: snapshot.isDragging
                        })}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className='flex justify-center items-center'>
                          {submitted &&
                            <>
                              {
                                rightOptions.filter((e) => e.name === item.name)[0]?.answerPosition - 1 === state.findIndex((e) => e.name === item.name) ?
                                  <IconCheck className='ml-2' color='green' size={32} />
                                  : <IconX className='ml-2' color='red' size={32} />
                              }
                            </>
                          }
                          <Text className='md:text-xl text-md text-black font-bold mx-4'>{item.name}</Text>
                          {
                            submitted &&
                            <div className='rounded-full px-2 bg-vivid_sky_blue bg-teal-300'>
                              <Text className='text-black font-bold'>{item.answerPosition}</Text>
                            </div>
                          }
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}