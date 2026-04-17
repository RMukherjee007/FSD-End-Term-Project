const axios = require('axios');
const SearchLog = require('../models/SearchLog');

const getGithubMetrics = async (req, res) => {
    const { username } = req.params;

    try {
        // RESUME CLAIM: Asynchronously aggregated developer metrics
        const [profileRes, reposRes] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`),
            axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=updated`)
        ]);

        const data = {
            profile: {
                name: profileRes.data.name,
                followers: profileRes.data.followers,
                repos: profileRes.data.public_repos,
                avatar: profileRes.data.avatar_url
            },
            recentRepos: reposRes.data.map(repo => ({
                name: repo.name,
                stars: repo.stargazers_count,
                language: repo.language
            }))
        };

        // RESUME CLAIM: Non-blocking MongoDB logging
        SearchLog.create({ username, success: true }).catch(console.error);

        res.json(data);

    } catch (error) {
        SearchLog.create({ username, success: false }).catch(console.error);
        res.status(500).json({ error: 'User not found or API limit reached' });
    }
};

module.exports = { getGithubMetrics };