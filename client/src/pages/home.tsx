import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import IPageProps from '../interfaces/page';

const HomePage: React.FunctionComponent<IPageProps> = props => {
    return (
        <Container fluid className="p-0">
        <Navigation />
        <Header
            headline="Check out what people have to say"
            title="A Nerdy Blog Website"
        />
        <Container className="mt-5">
                Big Stuffs here ..........
            </Container>
        </Container>
    );
}

export default HomePage;