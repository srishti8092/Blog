import React from 'react';
import { Card, CardBody } from 'reactstrap';
import CenterPiece from '../CenterPiece';

export interface ILoadingProps {
    dotType?: string;
    children:boolean;
}

export const Loading: React.FunctionComponent<ILoadingProps> = props => {
    const { children, dotType } = props;

    return (
        <div className="text-center">
            <div className="stage">
                <div className={dotType} />
            </div>
            {children}
        </div>
    )
}

Loading.defaultProps = {
    dotType: 'dot-bricks'
}

export interface ILoadingComponentProps {
    card: boolean;
    dotType?: string;
    children:boolean;
}

const LoadingComponent: React.FunctionComponent<ILoadingComponentProps> = props => {
    const { card, dotType , children } = props;

    if (card)
    {
        return (
            <CenterPiece>
                <Card>
                    <CardBody>
                        <Loading>{children}</Loading>
                    </CardBody>
                </Card>
            </CenterPiece>
        );
    }

    return (
        <div className="text-center">
            <div className="stage">
                <div className={dotType} />
            </div>
            {children}
        </div>
    );
}

LoadingComponent.defaultProps = {
    dotType: 'dot-bricks',
    children:false,
    card:false
}

export default LoadingComponent;