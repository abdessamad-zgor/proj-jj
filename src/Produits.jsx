import Header from './Header';
import axios from 'axios';
import { Component } from 'react';

const getData = async () => {
  const res = await axios.get('https://api.escuelajs.co/api/v1/products');
  return res.data;
}
// get categories
const getCategories = async ()=>{
  const res = await axios.get('https://api.escuelajs.co/api/v1/categories');
  return res.data
}


export default class Produits extends Component {

  constructor(props){
    super(props);
    this.state = {
      produits: [],
      activeId:0,
      categories:[],
      activeCategory: "All",
      categoryProducts: []
    }
    this.selectCategory = this.selectCategory.bind(this)
  }

  componentDidMount(){
    getData().then((produits) => this.setState({produits: produits}));
    getCategories().then((categories) => this.setState({categories: categories}))
  }

  componentDidUpdate(_, prevState){
    if(prevState.activeCategory != this.state.activeCategory){
      console.log("active category : ", this.state.activeCategory);
      if(this.state.activeCategory.toLowerCase() !="all") 
        this.setState({categoryProducts: this.state.produits.filter(p=>p.category.name.toLowerCase() == this.state.activeCategory.toLowerCase())});
    }
  }

  selectCategory (e){
    let category = e.currentTarget.value;
    console.log(category);
    this.setState({activeCategory: category})   
  }

  render(){

    return <div className='w-full min-h-screen '>
        <Header categories={this.state.categories} selectCategory={this.selectCategory}/>
        <h3 className='text-lg text-left px-8'>le nombre des produits: {this.state.activeCategory=="All"?this.state.produits.length: this.state.categoryProducts.length}</h3><br />
        <div className='flex flex-row justify-center items-baseline gap-4 w-full flex-wrap px-12'>
          {
            (this.state.activeCategory=="All"?this.state.produits:this.state.categoryProducts).map(item => (
              <div key={item.id} className='basis-1/5 px-4 py-px border rounded shadow'>
                <img src="https://picsum.photos/300/400" alt="image" />
                <h2 className='text-lg'>{item.title}</h2>
                <h3 className='text-sm font-light'>Prix:{item.price}</h3>        
              </div>
            )
            )
          }
        </div>
    </div>
  }
}

