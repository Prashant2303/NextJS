import styles from 'styles/List.module.css';
import React from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';
import Question from './Question';
import { useRecoilState } from 'recoil';
import { stateFilter, stateQuestions } from 'store/atoms';

const List = ({ loading }) => {

    const [questions,] = useRecoilState(stateQuestions);
    const [filterState,] = useRecoilState(stateFilter);

    const renderLoading = () => {
        return (
            <div className={styles.spinner}>
                <CircularProgress />
            </div>
        )
    }

    const renderEmptyList = () => {
        return <div className={styles.emptyList}>No Questions</div>
    }

    const renderQuestions = filterState.filter ? filterState.filteredQuestions : questions;

    return (
        <Paper className={styles.list} elevation={3}>
            <Grid container className={styles.headings} spacing={1}>
                <Grid className={styles.nameHeading} item sm={6.4}>Name</Grid>
                <Grid item xs={4} sm={1.7}>Difficulty</Grid>
                <Grid item xs={4} sm={1.7}>Status</Grid>
                <Grid item xs={3} sm={1.7}>Notes</Grid>
                <Grid item xs={1} sm={0.5}></Grid>
            </Grid>
            {
                loading ? renderLoading()
                    : !renderQuestions || renderQuestions.length === 0 ? renderEmptyList()
                        : renderQuestions.map((question, index) => <Question key={question.id} index={index} question={question} />)
            }
        </Paper>
    )
}

export default List;