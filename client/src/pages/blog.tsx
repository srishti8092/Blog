import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {   Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ErrorText from '../components/ErrorText';
import Header from '../components/Header';
import LoadingComponent, { Loading } from '../components/LoadingComponent';
import Navigation from '../components/Navigation';
import config from '../config/config';
import UserContext from '../contexts/user';
import IBlog from '../interfaces/blog';
import IUser from '../interfaces/user';

const BlogPage: React.FunctionComponent<any> = props => {
    const [_id, setId] = useState<string>('');
    const [blog, setBlog] = useState<IBlog|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [modal, setModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const { user } = useContext(UserContext).userState;
    const history = useNavigate();
    
    useEffect(() => {
        let _blogId = props.match.params.blogID;

        if (_blogId) 
        {
            setId(_blogId);
        }
        else
        {
            props.history.push('/');
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (_id !== '')
            getBlog();
        
        // eslint-disable-next-line
    }, [_id])

    const getBlog = async () => {
        try 
        {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs/read/${_id}`,
            });

            if (response.status === (200 || 304))
            { 
                setBlog(response.data.blog);
            }
            else
            {
                setError(`Unable to retrieve blog ${_id}`);
            }
        } 
        catch (error) 
        {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
              }
            setError(errorMessage);
        }
        finally
        {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    const deleteBlog = async () => {
        setDeleting(true);

        try 
        {
            const response = await axios({
                method: 'DELETE',
                url: `${config.server.url}/blogs/${_id}`,
            });

            if (response.status === 201)
            {
                setTimeout(() => {
                    props.history.push('/');
                }, 1000); 
            }
            else
            {
                setError(`Unable to retrieve blog ${_id}`);
                setDeleting(false);
            }
        } 
        catch (error) 
        {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
              }
            setError(errorMessage);
            setDeleting(false);
        }
    }    

    type HeaderProps = {
        children: React.ReactNode; 
      };

    const Header  = (props: any) => {
        return (
          <div>
            <h1>Hello World</h1>
            {props.children}
          </div>
        );
      };

    if (loading) return <LoadingComponent  children={false} card={false}></LoadingComponent>;

    if (blog)
    {
        return (
            <Container fluid className="p-0">
                <Navigation />
                <Modal isOpen={modal}>
                    <ModalHeader>Delete</ModalHeader>
                        <ModalBody>
                            {deleting ?
                                <Loading children={false} />
                            :
                                "Are you sure you want to delete this blog?"   
                            }
                            <ErrorText error={error} />
                        </ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={() => deleteBlog()}>Delete Permanently</Button>
                    <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Header
                    image={blog.picture || undefined}
                    headline={blog.headline}
                    title={blog.title}
                >
                    <p className="text-white">Posted by {(blog.author as IUser).name} on {new Date(blog.createdAt).toLocaleString()}</p>
                </Header>
                <Container className="mt-5">
                    {user._id === (blog.author as IUser)._id &&
                        <Container fluid className="p-0">
                            <Button color="info" className="mr-2" tag={Link} to={`/edit/${blog._id}`}><i className="fas fa-edit mr-2"></i>Edit</Button>
                            <Button color="danger" onClick={() => setModal(true)}><i className="far fa-trash-alt mr-2"></i>Delete</Button>
                            <hr />
                        </Container>
                    }
                    <ErrorText error={error} />
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Container>
            </Container>
        )
    }
    else
    {
        return <Navigate to='/' />;
    }
}

export default BlogPage;