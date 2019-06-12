import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: '898cafff28dd79758b3f',
            clientSecret: 'eb092b59dd1affb580626ebe09d9ce9a4c836855',
            count: 5,
            sort: 'created: asc',
            repos: [],
            notFound: false
        }
    }

    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
        .then(res => res.json())
        .then(data => {
            if (this.refs.repoItems) {
                if (data.message) {
                    this.setState({ notFound: true })
                } else {
                    this.setState({ repos: data });
                }
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        const { repos, notFound } = this.state;
        if (notFound) {
            return (
                <div ref="repoItems">
                    <hr />
                    <h3 className="mb-3">Latest Github Repos</h3>
                    <p>User Provided Not Found</p>
                </div>
            )
        } else {
            const repoItems = repos.map(repo => (
                <div key={repo.id} className="card card-body mb-2">
                    <div className="row">
                        <div className="col-md-6">
                            <h4>
                                <Link to={repo.html_url} target="_blank">{repo.name}</Link>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div className="col-md-6">
                            <span className="badge badge-info mr-1">
                                Stars: {repo.stargazers_count}
                            </span>
                            <span className="badge badge-seconday mr-1">
                                Watchers: {repo.watchers_count}
                            </span>
                            <span className="badge badge-success">
                                Forks: {repo.forks_count}
                            </span>
                        </div>
                    </div>
                </div>
            ))
            return (
                <div ref="repoItems">
                    <hr />
                    <h3 className="mb-4">Latest Github Repos</h3>
                    {repoItems}
                </div>
            )
        }
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
}

export default ProfileGithub;