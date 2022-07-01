import { Paper, TextField, Typography, MenuItem, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useHooks } from "service/apiCalls";
import { statePrivateLists, stateUser } from "store/atoms";
import Loading from 'components/Loading';

export default function Profile() {
    const hooks = useHooks();
    const user = useRecoilValue(stateUser);
    const privateLists = useRecoilValue(statePrivateLists);
    const [updatingList, setUpdatingList] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [updatingCategory, setUpdatingCategory] = useState(false);
    const [updatingDifficulty, setUpdatingDifficulty] = useState(false);

    const categories = ['Array', 'Linked List', 'Binary Tree', 'Binary Search Tree', 'Tree', 'Heap', 'Stack', 'Matrix', 'String', 'Queue', 'Graph', 'Trie', 'Others'];

    useEffect(() => {
        hooks.redirectIfLoggedOut()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'defaultList') setUpdatingList(true);
        if (name === 'defaultStatus') setUpdatingStatus(true);
        if (name === 'defaultCategory') setUpdatingCategory(true);
        if (name === 'defaultDifficulty') setUpdatingDifficulty(true);

        await hooks.updateUserDetails(name, value);

        if (name === 'defaultList') setUpdatingList(false);
        if (name === 'defaultStatus') setUpdatingStatus(false);
        if (name === 'defaultCategory') setUpdatingCategory(false);
        if (name === 'defaultDifficulty') setUpdatingDifficulty(false);
    }

    const renderDefaults = () => (
        <Grid container alignItems="center" spacing={2} my={1}>
            <Grid item xs={12} padding={1}>
                Default selections :-
            </Grid>
            <Grid item xs={4}>
                <TextField
                    select
                    id="defaultDifficulty"
                    name="defaultDifficulty"
                    label="Difficulty"
                    value={user.defaultDifficulty}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={updatingDifficulty}
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    select
                    id="defaultStatus"
                    name="defaultStatus"
                    label="Status"
                    value={user.defaultStatus}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={updatingStatus}
                >
                    <MenuItem value="Todo">Todo</MenuItem>
                    <MenuItem value="Revise">Revise</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    select
                    id="defaultCategory"
                    name="defaultCategory"
                    label="Category"
                    value={user.defaultCategory}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={updatingCategory}
                >
                    {categories.sort().map((option) => (
                        <MenuItem id={option} key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            {!privateLists || privateLists.length === 0 ? null :
                <Grid item xs={12}>
                    <TextField
                        select
                        name="defaultList"
                        value={user?.defaultList}
                        label="Default List"
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        disabled={updatingList}
                    >
                        {privateLists.map(list =>
                            <MenuItem key={list._id} value={list._id} >
                                {list.name} {list._id === user.defaultList ? '(Default)' : null} ({list.access})
                            </MenuItem>)}
                    </TextField>
                </Grid>}
        </Grid>
    )

    const renderContent = () => {
        const publicListCount = privateLists.filter(list => list.access === 'Public').length;
        return (
            <Paper elevation={3} sx={{ marginTop: '10px', padding: '15px' }}>
                <Typography variant="h6" component="div">
                    {user?.username}
                </Typography>
                <Grid py={1}>
                    Email : {user?.email}
                </Grid>
                <Grid py={1}>
                    No. of Public Lists : {publicListCount}
                </Grid>
                <Grid py={1}>
                    No. of Private Lists : {privateLists.length - publicListCount}
                </Grid>
                {renderDefaults()}
            </Paper>
        )
    }

    return (
        !privateLists ? <Loading /> : renderContent()
    )
}