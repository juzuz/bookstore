import React from 'react';
import {Card, Checkbox,InputNumber,Dropdown,Menu,} from 'antd';
import {Link} from 'react-router-dom'

const { Meta } = Card;

export class Book extends React.Component{

    render() {

        const info = this.props.info;
        const inCart = this.props.inCart;

        return (
            <div>

                <Link to={{
                    pathname: '/bookDetails',
                    search: '?id=' + info.id
                }}
                      target="_blank"
                >
                    <Card
                        hoverable
                        style={{width: 181}}
                        cover={<img alt="image" src={info.image} className={"bookImg"}/>}
                        //onClick={this.showBookDetails.bind(this, info.bookId)}
                    >
                        <Meta title={info.name} description={'¥' + info.price}/>
                    </Card>
                </Link>
            </div>



        );
    }

}

