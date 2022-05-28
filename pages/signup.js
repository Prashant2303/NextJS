import styles from '../styles/Signup.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    Container,
} from '@mui/material';
import * as Yup from 'yup';
import Link from 'next/link';
import { useHooks } from '../apiCalls';

export default function Signup() {

    const hooks = useHooks();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (newuser) => {
        hooks.signup(newuser);
    };

    return (
        <Container className={styles.signup} maxWidth="xs">
            <Paper elevation={3}>
                <Box px={3} py={2}>
                    <Typography variant="h6" align="center" margin="dense">
                        SignUp
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                margin="dense"
                                {...register('username')}
                                error={errors.username ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.username?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                margin="dense"
                                {...register('email')}
                                error={errors.email ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.email?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                margin="dense"
                                {...register('password')}
                                error={errors.password ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.password?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                margin="dense"
                                {...register('confirmPassword')}
                                error={errors.confirmPassword ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.confirmPassword?.message}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container my={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                            size='large'
                            disableElevation
                            sx={{ 'textTransform': 'none', 'backgroundColor': '#1877f2' }}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid container py={3} justifyContent='center' sx={{ 'borderTop': '1px solid #dadde1' }}>
                        <Link href='/signin' passHref>
                            <Button
                                variant="contained"
                                color="success"
                                size='large'
                                disableElevation
                                sx={{ 'textTransform': 'none', 'width': '150px', 'backgroundColor': '#42b72a' }}
                            >
                                Sign In
                            </Button>
                        </Link>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}