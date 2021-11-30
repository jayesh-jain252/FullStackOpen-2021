const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    if (blogs.length === 0){
        return 0
    }
    const blog_likes = blogs.map(blog=>blog.likes)
    const sum_of_likes = blog_likes.reduce((acc,cur_val) =>
    {
        return acc + cur_val
    },0)
    return sum_of_likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 1){
        const favoriteBlogObj = {"title":blogs.title,"author":blogs.author,"likes":blogs.likes}
        return favoriteBlogObj
    }
    const max_likes = Math.max(...blogs.map(blog=>blog.likes))
    const favoriteBlogObj = blogs.find(({likes})=>likes === max_likes)
    return {"title":favoriteBlogObj.title,"author":favoriteBlogObj.author,"likes":favoriteBlogObj.likes}
}

const mostBlogs = (blogs) => {
    const blog_authors = blogs.map(blog=>blog.author)
    if(blog_authors.length == 0)
        return null;
    var modeMap = {};
    var maxEl = blog_authors[0], maxCount = 1;
    for(var i = 0; i < blog_authors.length; i++)
    {
        var el = blog_authors[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return {"author":maxEl,"blogs":maxCount};
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        let likesCounts = blogs.reduce((likesCount, blog) => {
            likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
            return likesCount
        }, {})
        let maxCount = Math.max(...Object.values(likesCounts))
        let mostLiked = Object.keys(likesCounts).filter(author => likesCounts[author] === maxCount)
        return {
            author: mostLiked[0],
            likes: maxCount
        }
    }
}

module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}